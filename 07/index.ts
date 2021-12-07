const solveOne = (data: number[]) => {
  const median = data[data.length / 2];

  return data.reduce((fuel, move) => {
    return fuel + Math.abs(move - median);
  }, 0);
};

const solveTwo = (data: number[]) => {
  const average = Math.floor(data.reduce((a, z) => a + z) / data.length);

  return data.reduce((fuel, move) => {
    const diff = Math.abs(move - average);
    return fuel + Math.floor(((diff * diff) + diff) / 2);
  }, 0);
};

const url = new URL("input.txt", import.meta.url);
const data = (await Deno.readTextFile(url)).split(",").map(Number).sort((a, z) => a - z);

console.log("Result one:", solveOne(data));
console.log("Result two:", solveTwo(data));
