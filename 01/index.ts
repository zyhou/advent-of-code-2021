const solveOne = (data: Array<number>) =>
  data.filter((item, index, arr) => index > 0 && item > arr[index - 1]).length;

const solveTwo = (data: Array<number>) => {
  let count = 0;

  for (let i = 1; i < data.length; i++) {
    if (
      data[i] + data[i + 1] + data[i + 2] >
        data[i - 1] + data[i] + data[i + 1]
    ) {
      count++;
    }
  }

  return count;
};

const url = new URL("input.txt", import.meta.url);
const data = (await Deno.readTextFile(url)).split("\n").map(Number);

console.log("Result one:", solveOne(data));
console.log("Result two:", solveTwo(data));
