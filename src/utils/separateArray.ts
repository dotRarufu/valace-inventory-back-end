export const separateArray = <T>(
  arr: T[],
  chunkSize: number
): (T | string)[][] => {
  const result: (T | string)[][] = [];

  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }

  const lastSubArray = result[result.length - 1];
  if (lastSubArray.length < chunkSize) {
    const diff = chunkSize - lastSubArray.length;
    for (let i = 0; i < diff; i++) {
      lastSubArray.push('');
    }
  }

  return result;
};
