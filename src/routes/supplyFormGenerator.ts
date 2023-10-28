import Excel from 'exceljs';
import { generateSpreadsheetRange } from '../utils/generateSpreadsheetRange.js';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { getItem } from '../services/item.js';
import { getOfficeData, getRequest } from '../services/request.js';

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

export type RestockItemRequest = {
  id: string;
  amount: number;
};

export type RequestItem = {
  id: string;
  name: string;
  description: string;
  requestedBy: string;
  isIncluded: boolean;
  // ...
};

type GenerateSupplyFormRequest = {
  restock: RestockItemRequest[];
  requests: RequestItem[];
};

// Item #	- incrementing
// Item Name
// Description
// Requested By	- in requested items only?
// Total Quantity
// Unit
// Quantity on Hand Left - in restocks only
// PR AND RIS NUMBER - ??
// Stock Location	- in restock items only?
// DATE DELIVERED	- ?
// Reorder Quantity	- in restocks only
// Total Amount	- in requested items only
// Supplier	- ?
// Status - ?

export const generateSupplyForm = async (
  req: Request<{}, {}, GenerateSupplyFormRequest>,
  res: Response
) => {
  try {
    console.log('==========================');
    console.log('Generate form supply request received');
    const { requests, restock: restocks } = req.body;
    const requestId = uuidv4();

    const restocksData = await Promise.all(
      restocks.map(async r => {
        const item = await getItem(r.id);

        return { ...item, amount: r.amount };
      })
    );
    const requestsData = await Promise.all(
      requests.map(async r => {
        const item = await getRequest(r.id);
        const officeData = await getOfficeData(r.requestedBy);

        return { ...item, requestedBy: officeData.name || officeData.username };
      })
    );

    const workbook = new Excel.Workbook();
    const fileName = path.join(process.cwd(), 'supply-form', 'template.xlsx');
    const template = await workbook.xlsx.readFile(fileName);
    const sheet1 = template.worksheets[0];
    const dataStartRow = 5;

    // Insert data
    const requestRows = requestsData.map(
      ({ item_name, description, requestedBy, amount, unit }, index) => [
        (index + 1).toString(),
        item_name,
        description,
        requestedBy,
        amount,
        unit,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ]
    );
    const restockRows = restocksData.map(
      ({ name, remarks, total, amount, unit, supplier }, index) => [
        (index + 1).toString(),
        name,
        remarks,
        'ValAce',
        total,
        unit,
        amount,
        '',
        '',
        '',
        '',
        '',
        supplier,
        '',
      ]
    );
    const data = [...restockRows, ...requestRows];

    data.map(d => sheet1.insertRow(dataStartRow, d, 'o'));

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

    res.status(200).send(requestId);
  } catch (err) {
    console.log('supply form generator erred:', err);
    res.status(500).send(err);
  }
};
