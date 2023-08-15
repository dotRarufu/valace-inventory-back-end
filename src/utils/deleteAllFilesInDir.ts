import fsPromises from 'fs/promises';
import path from 'path';

export const deleteAllFilesInDir = async (dirPath: string) => {
  try {
    const files = await fsPromises.readdir(dirPath);

    const deleteFilePromises = files.map(file =>
      fsPromises.unlink(path.join(dirPath, file))
    );

    await Promise.all(deleteFilePromises);

    console.log('temp folder files deleted');
  } catch (err) {
    console.log('could not delete files in ' + dirPath + ': ' + err);
  }
};
