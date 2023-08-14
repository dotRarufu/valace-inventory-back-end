import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import PDFDocument from 'pdfkit';
import blobStream from 'blob-stream';
import PdfMake from 'pdfmake';
import {
  Column,
  Content,
  TDocumentDefinitions,
  TFontDictionary,
} from 'pdfmake/interfaces.js';
import { Collections, ItemResponse } from '../../pocketbase-types.js';
import pb from '../lib/pocketbase.js';
import { downloadImage } from '../utils/downloadImage.js';

const separateArray = <T>(arr: T[], chunkSize: number): (T | string)[][] => {
  const result: (T | string)[][] = [];

  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }

  const lastSubArray = result[result.length - 1];
  if (lastSubArray.length < chunkSize) {
    const diff = chunkSize - lastSubArray.length;
    for (let i = 0; i < diff; i++) {
      lastSubArray.push('');
    }
  }

  return result;
};

const deleteAllFilesInDir = async (dirPath: string) => {
  try {
    const files = await fsPromises.readdir(dirPath);

    const deleteFilePromises = files.map(file =>
      fsPromises.unlink(path.join(dirPath, file))
    );

    await Promise.all(deleteFilePromises);

    console.log('temp folder files deleted');
  } catch (err) {
    console.log('could not delete files in ' + dirPath + ': ' + err);
  }
};

export const cutoutGenerator = async (
  req: Request<{}, {}, { items: { id: string; amount: number }[] }>,
  res: Response
) => {
  try {
    const { items } = req.body;
    const height = 250;
    const width = 250;
    const reqs = items.map(async ({ id }) => {
      const record = await pb
        .collection(Collections.Item)
        .getOne<ItemResponse>(id);
      const fileToken = await pb.files.getToken();
      const fileName = record.qr;
      const url = pb.files.getUrl(record, fileName, { token: fileToken });

      return { url, fileName, id };
    });
    const imagesUrl = await Promise.all(reqs);
    const filePaths = await Promise.all(
      imagesUrl.map(async ({ url, fileName, id }) => ({
        id,
        url: await downloadImage(url, fileName, 'temp'),
      }))
    );
    const nameReqs = items.map(
      async i =>
        await pb.collection(Collections.Item).getOne<ItemResponse>(i.id)
    );
    const names = await Promise.all(nameReqs);

    const tables = items.map(item => {
      const images: Column[] = new Array(item.amount).fill(null).map(_ => {
        const res: Column = {
          image: filePaths.find(f => f.id === item.id).url,
          height,
          width,
        };

        return res;
      });
      const name = names.find(n => n.id === item.id).name;
      const body: (string | Column)[][] = [
        [name, ''],
        ...separateArray<Column>(images, 2),
      ];

      return {
        table: {
          body,
        },
      };
    });

    // todo: display product name in header
    const docDefinition: TDocumentDefinitions = {
      pageMargins: [0, 0, 0, 0],
      content: [...tables],
    };
    const fonts: TFontDictionary = {
      Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf',
      },
    };
    const printer = new PdfMake(fonts);
    const doc = printer.createPdfKitDocument(docDefinition);

    doc.pipe(fs.createWriteStream('pdfs/tables.pdf'));
    doc.end();
    deleteAllFilesInDir('temp');
    res.status(200).send('yes');
  } catch (err) {
    console.log('cutout generator erred:', err);
    res.status(500).send(err);
  }
};
