const solveOne = (binaries: string[]) => {
  const commonLength = binaries.length / 2;
  let gamma = "";
  let epsilon = "";

  for (let index = 0; index < binaries[0].length; index++) {
    const ones = binaries
      .map((number) => number[index] === "1")
      .filter((bit) => bit);

    if (ones.length >= commonLength) {
      gamma += "1";
      epsilon += "0";
    } else {
      gamma += "0";
      epsilon += "1";
    }
  }

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

const getMostCommonBit = (binaries: string[], bitIndex: number): "1" | "0" => {
  let count0 = 0;
  let count1 = 0;

  for (const binary of binaries) {
    if (binary[bitIndex] === "1") {
      count1++;
    } else {
      count0++;
    }
  }

  return count1 >= count0 ? "1" : "0";
};

const solveTwo = (binaries: string[]) => {
  let oxygen = binaries;
  let co2 = binaries;
  const bitLength = binaries[0].length;

  for (let i = 0; i < bitLength && oxygen.length > 1; i++) {
    const mostCommonBit = getMostCommonBit(oxygen, i);
    oxygen = oxygen.filter((line) => line[i] === mostCommonBit);
  }

  for (let i = 0; i < bitLength && co2.length > 1; i++) {
    const mostCommonBit = getMostCommonBit(co2, i);
    co2 = co2.filter((line) => line[i] !== mostCommonBit);
  }

  return parseInt(oxygen[0], 2) * parseInt(co2[0], 2);
};

const url = new URL("input.txt", import.meta.url);
const binaries = (await Deno.readTextFile(url)).split("\n");

console.log("Result one:", solveOne(binaries));
console.log("Result two:", solveTwo(binaries));
