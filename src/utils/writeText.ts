import fs from 'fs';

const writeText = (filePath: string, text: string) => {
  try {
    fs.writeFileSync(filePath, text, 'utf8');
    console.log(`File '${filePath}' has been written.`);
  } catch (err) {
    console.error('Error writing the file:', err);
  }
};

export default writeText;
