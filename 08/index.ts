type Line = {
  before: string[];
  after: string[];
};

const solveOne = (lines: Line[]) => {
  let count = 0;

  for (const { before, after } of lines) {
    const byLength: Record<number, string[]> = {};
    for (const word of before) {
      if (!byLength[word.length]) {
        byLength[word.length] = [];
      }
      byLength[word.length].push(word);
    }
    for (const word of after) {
      if (byLength[word.length].length === 1) {
        count += 1;
      }
    }
  }

  return count;
};

const url = new URL("input.txt", import.meta.url);
const data = (await Deno.readTextFile(url)).split("\n").map((line) => {
  const [beforeWords, afterWords] = line.split("|");
  const before = beforeWords.split(" ").filter(String);
  const after = afterWords.split(" ").filter(String);

  return { before, after } as Line;
});

console.log("Result one:", solveOne(data));
