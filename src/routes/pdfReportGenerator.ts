import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

import PDFDocument from 'pdfkit';
import blobStream from 'blob-stream';
import PdfMake from 'pdfmake';
import { TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces.js';

export const pdfReportGenerator = async (
  req: Request<{}, {}, { rowIds: string[] }>,
  res: Response
) => {
  const docDefinition: TDocumentDefinitions = {
    content: [
      { text: 'Tables', style: 'header' },
      'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
      {
        text: 'A simple table (no headers, no width specified, no spans, no styling)',
        style: 'subheader',
      },
      'The following table has nothing more than a body array',
      {
        style: 'tableExample',
        table: {
          body: [
            ['Column 1', 'Column 2', 'Column 3'],
            ['One value goes here', 'Another one here', 'OK?'],
          ],
        },
      },
      { text: 'A simple table with nested elements', style: 'subheader' },
      'It is of course possible to nest any other type of nodes available in pdfmake inside table cells',
      {
        style: 'tableExample',
        table: {
          body: [
            ['Column 1', 'Column 2', 'Column 3'],
            [
              {
                stack: [
                  "Let's try an unordered list",
                  {
                    ul: ['item 1', 'item 2'],
                  },
                ],
              },
              [
                'or a nested table',
                {
                  table: {
                    body: [
                      ['Col1', 'Col2', 'Col3'],
                      ['1', '2', '3'],
                      ['1', '2', '3'],
                    ],
                  },
                },
              ],
              {
                text: [
                  'Inlines can be ',
                  { text: 'styled\n', italics: true },
                  { text: 'easily as everywhere else', fontSize: 10 },
                ],
              },
            ],
          ],
        },
      },
      { text: 'Defining column widths', style: 'subheader' },
      'Tables support the same width definitions as standard columns:',
      {
        ul: ['auto', 'star', 'fixed value'],
      },
    ],
    styles: {
      header: {
        fontSize: 18,

        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,

        margin: [0, 10, 0, 5],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableOpacityExample: {
        margin: [0, 5, 0, 15],
        fillColor: 'blue',
        fillOpacity: 0.3,
      },
      tableHeader: {
        fontSize: 13,
        color: 'black',
      },
    },
    defaultStyle: {
      // alignment: 'justify'
    },
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

  console.log('runss');

  res.status(200).send('yes');
};
