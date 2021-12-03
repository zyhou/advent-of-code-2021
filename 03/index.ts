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

const url = new URL("input.txt", import.meta.url);
const binaries = (await Deno.readTextFile(url)).split("\n");

console.log("Result one:", solveOne(binaries));
