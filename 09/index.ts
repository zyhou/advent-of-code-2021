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

const solveTwo = (data: number[][]) => {
  const rowLength = data.length;
  const columnLength = data[0].length;

  const rowDirection = [-1, 0, 1, 0];
  const columnDirection = [0, 1, 0, -1];

  const sizes: number[] = [];
  const seen: Array<[number, number]> = [];

  for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
    for (let columnIndex = 0; columnIndex < columnLength; columnIndex++) {
      if (
        !seen.some((s) => s[0] === rowIndex && s[1] === columnIndex) &&
        data[rowIndex][columnIndex] !== 9
      ) {
        let size = 0;
        const queues: Array<[number, number]> = [[rowIndex, columnIndex]];

        while (queues.length > 0) {
          const element = queues.shift();
          if (!element) {
            continue;
          }
          const [newRowIndex, newColumnndex] = element;

          if (seen.some((s) => s[0] === newRowIndex && s[1] === newColumnndex)) {
            continue;
          }

          seen.push([newRowIndex, newColumnndex]);
          size += 1;

          for (let index = 0; index < 4; index++) {
            const directionRowIndex = newRowIndex + rowDirection[index];
            const directionColumnIndex = newColumnndex + columnDirection[index];

            if (
              0 <= directionRowIndex && 0 <= directionColumnIndex &&
              directionRowIndex < rowLength &&
              directionColumnIndex < columnLength &&
              data[directionRowIndex][directionColumnIndex] !== 9
            ) {
              queues.push([directionRowIndex, directionColumnIndex]);
            }
          }
        }
        sizes.push(size);
      }
    }
  }

  const [first, second, three] = sizes
    .sort((a, z) => z - a);

  return first * second * three;
};

const url = new URL("input.txt", import.meta.url);
const data = (await Deno.readTextFile(url)).split("\n").map((line) =>
  line.split("").map((num) => parseInt(num, 10))
);

console.log("Result one:", solveOne(data));
console.log("Result two:", solveTwo(data));
