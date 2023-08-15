import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
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
import { deleteAllFilesInDir } from '../utils/deleteAllFilesInDir.js';
import { separateArray } from '../utils/separateArray.js';
import { v4 as uuidv4 } from 'uuid';

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
    const requestId = uuidv4();
    const filePath = path.join('cutouts', `${requestId}.pdf`);
    doc.pipe(fs.createWriteStream(filePath));
    doc.end();
    console.log('filePath:', filePath);
    deleteAllFilesInDir('temp');
    res.status(200).send(requestId);
  } catch (err) {
    console.log('cutout generator erred:', err);
    res.status(500).send(err);
  }
};
