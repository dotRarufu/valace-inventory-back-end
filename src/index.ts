import { ImageRun, Paragraph, PatchType, patchDocument } from 'docx';
import express, { Request, Response } from 'express';
import 'dotenv/config';
const fs = require('fs');
const path = require('path');
import process from 'process';

const app = express();

interface a {}

app.get(
  '/',
  async (req: Request<{}, {}, { itemIds: string[] }>, res: Response) => {
    const filePath = path.join(__dirname, 'public/cutout-template.docx');
    const doc = await patchDocument(fs.readFileSync(filePath), {
      patches: {
        slot_1: {
          type: PatchType.DOCUMENT,
          children: [
            new Paragraph({
              children: [
                new ImageRun({
                  data: fs.readFileSync(path.join(__dirname, 'qr.png')),
                  transformation: { width: 300, height: 300 },
                }),
              ],
            }),
          ],
        },
        slot_2: {
          type: PatchType.DOCUMENT,
          children: [
            new Paragraph({
              children: [
                new ImageRun({
                  data: fs.readFileSync(path.join(__dirname, 'qr.png')),
                  transformation: { width: 300, height: 300 },
                }),
              ],
            }),
          ],
        },
      },
    });

    fs.writeFileSync(path.join(__dirname, 'temp/asd.docx'), doc);
    // const itemIds = req.body.itemIds;
    res.sendFile(path.join(__dirname, 'temp/asd.docx'));

    // get list of item ids
    // get item ids' qr code
    // combine qr codes to doc
    // upload
  }
);

app.post(
  '/',
  async (req: Request<{}, {}, { rowIds: string[] }>, res: Response) => {
    res.sendFile(path.join(__dirname, 'temp/asd.docx'));
  }
);

const port = Number(process.env.PORT) || 8000;
const ip = process.env.IP || '';

if (process.env.NODE_ENV === 'PROD') {
  app.listen(port, ip, () => {
    console.log(`⚡[Microservice 1]: Listening on port ${port}`);
  });
} else {
  app.listen(port, () => {
    console.log(`[DEV MODE]: Listening on port ${port}`);
  });
}
app.listen();
