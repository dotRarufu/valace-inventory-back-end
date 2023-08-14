import axios from 'axios';
import fs from 'fs';
import path from 'path';

export const downloadImage = async (
  url: string,
  filename: string,
  savePath: string
) => {
  const response = await axios.get(url, { responseType: 'arraybuffer' });

  const filePath = path.join(savePath, filename);

  fs.writeFileSync(filePath, response.data);
  console.log('filePath:', filePath);
  return filePath;
};
