const solveOne = (data: number[][]) => {
  const rowLength = data.length;
  const columnLength = data[0].length;

  const rowDirection = [-1, 0, 1, 0];
  const columnDirection = [0, 1, 0, -1];

  let count = 0;

  for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
    for (let columnIndex = 0; columnIndex < columnLength; columnIndex++) {
      let isHigher = true;
      for (let index = 0; index < 4; index++) {
        const newRowIndex = rowIndex + rowDirection[index];
        const newColumnIndex = columnIndex + columnDirection[index];

        if (
          0 <= newRowIndex && 0 <= newColumnIndex &&
          newRowIndex < rowLength &&
          newColumnIndex < columnLength &&
          data[newRowIndex][newColumnIndex] <= data[rowIndex][columnIndex]
        ) {
          isHigher = false;
        }
      }

      if (isHigher) {
        count += data[rowIndex][columnIndex] + 1;
      }
    }
  }

  return count;
};

const url = new URL("input.txt", import.meta.url);
const data = (await Deno.readTextFile(url)).split("\n").map((line) =>
  line.split("").map((num) => parseInt(num, 10))
);

console.log("Result one:", solveOne(data));
