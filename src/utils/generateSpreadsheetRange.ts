export const generateSpreadsheetRange = (
  startCoord: string,
  endCoord: string
): string[] => {
  const start = convertToXYCoordinates(startCoord);
  const end = convertToXYCoordinates(endCoord);

  if (!start || !end) {
    throw new Error('Invalid spreadsheet coordinates.');
  }

  const range = [];
  for (let x = start.x; x <= end.x; x++) {
    for (let y = start.y; y <= end.y; y++) {
      range.push(convertToSpreadsheetCoordinate(x, y));
    }
  }

  return range;
};

// Function to convert spreadsheet coordinates to (x, y) coordinates
const convertToXYCoordinates = (
  spreadsheetCoordinate: string
): { x: number; y: number } | null => {
  const match = spreadsheetCoordinate.match(/^([A-Z]+)(\d+)$/);

  if (match) {
    const column = match[1];
    const row = parseInt(match[2], 10);

    const x = column.split('').reduce((acc, char) => {
      return acc * 26 + char.charCodeAt(0) - 'A'.charCodeAt(0);
    }, 0);

    const y = row - 1;

    return { x, y };
  }

  return null;
};

// Function to convert (x, y) coordinates to spreadsheet coordinates
const convertToSpreadsheetCoordinate = (x: number, y: number): string => {
  const column = convertToColumnLabel(x);
  const row = y + 1; // Add 1 for 1-based rows
  return `${column}${row}`;
};

// Function to convert numeric index to column label (e.g., 0 to "A", 1 to "B", ...)
const convertToColumnLabel = (num: number): string => {
  let label = '';
  while (num >= 0) {
    const remainder = num % 26;
    label = String.fromCharCode(65 + remainder) + label; // 65 is ASCII for 'A'
    num = Math.floor(num / 26) - 1;
  }
  return label;
};
