import Excel from 'exceljs';
import { generateSpreadsheetRange } from '../utils/generateSpreadsheetRange.js';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const sampledData = [
  [
    '1',
    'Penble Mouse',
    'Goofy Mouse',
    'Andrei',
    'pcs',
    1,
    '20-123',
    '3rd Floor',
    new Date(),
  ],
  [
    '2',
    'A6 Laptop',
    'laptop ko',
    'me',
    'pcs',
    1,
    '20-456',
    '3rd Floor',
    new Date(),
  ],
];

export const generateSupplyForm = async (
  req: Request<{}, {}, { items: { id: string; amount: number }[] }>,
  res: Response
) => {
  try {
    const {} = req.body;
    const requestId = uuidv4();

    console.log('STart');
    const workbook = new Excel.Workbook();
    const fileName = path.join(process.cwd(), 'supply-form', 'template.xlsx');
    const template = await workbook.xlsx.readFile(fileName);
    const sheet1 = template.worksheets[0];
    const dataStartRow = 5;

    // Insert data
    sampledData.map(d => sheet1.insertRow(dataStartRow, d, 'o'));

    // Style
    const spreadsheetRange = generateSpreadsheetRange('A5', 'N7');
    spreadsheetRange.forEach(coordinate => {
      sheet1.getCell(coordinate).style = {
        alignment: { horizontal: 'center', vertical: 'bottom' },
      };

      sheet1.getCell(coordinate).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    const output = path.join(
      process.cwd(),
      'supply-form',
      'generated',
      `${requestId}.xlsx`
    );
    await template.xlsx.writeFile(output);
    console.log('end');

    res.status(200).send(requestId);
  } catch (err) {
    console.log('supply form generator erred:', err);
    res.status(500).send(err);
  }
};
