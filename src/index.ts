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
import { cutoutGenerator } from './routes/cutoutGenerator.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', cutoutGenerator);

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
  app.listen(port, () => {
    console.log(`[DEV MODE]: Listening on ${ip}:${port}`);
  });
}
