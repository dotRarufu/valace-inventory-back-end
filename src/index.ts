import express, { Request, Response } from 'express';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import process from 'process';
import { pdfReportGenerator } from './routes/pdfReportGenerator.js';
import pb from './lib/pocketbase.js';
import { Collections, ItemRecord, ItemResponse } from '../pocketbase-types.js';
import { downloadImage } from './utils/downloadImage.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.get(
  '/',
  async (req: Request<{}, {}, { itemIds: string[] }>, res: Response) => {
    const filePath = path.join('public', 'cutout-template.docx');
    // const doc = await patchDocument(fs.readFileSync(filePath), {
    //   patches: {
    //     slot_1: {
    //       type: PatchType.DOCUMENT,
    //       children: [
    //         new Paragraph({
    //           children: [
    //             new ImageRun({
    //               data: fs.readFileSync(path.join(__dirname, 'qr.png')),
    //               transformation: { width: 300, height: 300 },
    //             }),
    //           ],
    //         }),
    //       ],
    //     },
    //     slot_2: {
    //       type: PatchType.DOCUMENT,
    //       children: [
    //         new Paragraph({
    //           children: [
    //             new ImageRun({
    //               data: fs.readFileSync(path.join(__dirname, 'qr.png')),
    //               transformation: { width: 300, height: 300 },
    //             }),
    //           ],
    //         }),
    //       ],
    //     },
    //   },
    // });
    console.log('Print QR code request received');
    const { itemIds } = req.body;

    const reqs = itemIds.map(async id => {
      const record = await pb
        .collection(Collections.Item)
        .getOne<ItemResponse>(id);
      const fileToken = await pb.files.getToken();
      const fileName = record.qr;
      const url = pb.files.getUrl(record, fileName, { token: fileToken });

      return { url, fileName };
    });
    const imagesUrl = await Promise.all(reqs);
    const filePaths = await Promise.all(
      imagesUrl.map(async ({ url, fileName }, index) =>
        downloadImage(url, fileName, 'temp')
      )
    );

    res.status(200).send('yes');

    // fs.writeFileSync(path.join(__dirname, 'temp/asd.docx'), doc);
    // const itemIds = req.body.itemIds;
    // res.sendFile(path.join(__dirname, 'temp/asd.docx'));

    // get list of item ids
    // get item ids' qr code (in pocketbase)
    // combine qr codes to doc
    // upload
  }
);

app.post('/', pdfReportGenerator);

const authData = pb.admins
  .authWithPassword('admin1@email.com', 'admin1password')
  .then(a => console.log('Successfully authenticated'))
  .catch(a => console.log('Authentication failed'));

const port = Number(process.env.PORT) || 8000;
const ip = process.env.IP || '';

if (process.env.NODE_ENV === 'PROD') {
  app.listen(port, ip, () => {
    console.log(`⚡[Microservice 1]: Listening on port ${port}`);
  });
} else {
  app.listen(port, ip, () => {
    console.log(`[DEV MODE]: Listening on ${ip}:${port}`);
  });
}
