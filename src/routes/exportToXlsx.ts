import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import csv from 'stream';
import pb from '../lib/pocketbase.js';
import { Collections, ItemResponse } from '../../pocketbase-types.js';
import { Parser } from '@json2csv/plainjs';
import { convertCsvToXlsx } from '@aternus/csv-to-xlsx';
import { v4 as uuidv4 } from 'uuid';
import { deleteAllFilesInDir } from '../utils/deleteAllFilesInDir.js';

export const exportToXlsx = async (
  req: Request<{}, {}, { ids: string[] }>,
  res: Response
) => {
  const ids = req.body.ids;
  console.log('to xlsx | ids:', ids);
  // Get ids data

  const reqs = ids.map(
    async id => await pb.collection(Collections.Item).getOne<ItemResponse>(id)
  );
  const response = await Promise.all(reqs);

  // Remove unnecessary fields
  const fields = response.map(
    ({
      name,
      quantity,
      supplier,
      remarks,
      type,
      property_number,
      serial_number,
    }) => ({
      name,
      quantity,
      supplier,
      remarks,
      type,
      property_number,
      serial_number,
    })
  );

  // Convert to csv
  const parser = new Parser();
  const csv = parser.parse(fields);

  const requestId = uuidv4();
  fs.writeFileSync(`temp/${requestId}.csv`, csv);

  // Convert csv to xlsx
  const source = path.join(process.cwd(), 'temp', `${requestId}.csv`);
  const destination = path.join(process.cwd(), 'xlsx', `${requestId}.xlsx`);
  convertCsvToXlsx(source, destination);

  // Clean up, delete csv file
  deleteAllFilesInDir('temp');

  res.status(200).send(requestId);
};
