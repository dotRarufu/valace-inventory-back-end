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

  fs.writeFile(filePath, response.data, (err: unknown) => {
    if (err) throw err;
    console.log(`Image ${filename} downloaded successfully!`);
  });

  return filePath;
};
