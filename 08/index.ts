type Line = {
  before: string[];
  after: string[];
};

const solveOne = (lines: Line[]) => {
  let count = 0;

  for (const { after } of lines) {
    const matches = after.filter((v) => [2, 4, 3, 7].includes(v.length));
    count += matches.length;
  }

  return count;
};

// number => nb of segments
// 0 => 6
// 1 => 2 #
// 2 => 5
// 3 => 5
// 4 => 4 #
// 5 => 5
// 6 => 6
// 7 => 3 #
// 8 => 7 #
// 9 => 6

function includes(a: string, b: string) {
  const set = new Set([...a]);
  return [...b].every((x) => set.has(x));
}

const solveTwo = (lines: Line[]) => {
  let count = 0;

  for (const { before, after } of lines) {
    const matches: Record<number, string | undefined> = {
      1: before.find((w) => w.length === 2),
      4: before.find((w) => w.length === 4),
      7: before.find((w) => w.length === 3),
      8: before.find((w) => w.length === 7),
    };

    matches[6] = before.find(
      (w) => w.length === 6 && matches[1] && !includes(w, matches[1]),
    );
    matches[9] = before.find(
      (w) => w.length === 6 && w !== matches[6] && matches[4] && includes(w, matches[4]),
    );
    matches[0] = before.find(
      (w) => w.length === 6 && w !== matches[6] && w !== matches[9],
    );

    matches[3] = before.find(
      (w) => w.length === 5 && matches[1] && includes(w, matches[1]),
    );
    matches[5] = before.find(
      (w) => w.length === 5 && w !== matches[3] && matches[6] && includes(matches[6], w),
    );
    matches[2] = before.find(
      (w) => w.length === 5 && w !== matches[3] && w !== matches[5],
    );

    const translationTable = Object.fromEntries(
      Object.entries(matches).map((w) => w.reverse()),
    );

    const translated = Number(
      after.map((w) => translationTable[w]).join(""),
    );

    count += translated;
  }

  return count;
};

const url = new URL("input.txt", import.meta.url);
const data = (await Deno.readTextFile(url)).split("\n").filter(Boolean).map((line) => {
  const [before, after] = line.split(" | ").map((words) =>
    words.split(" ").map((word) => [...word].sort().join(""))
  );

  return { before, after } as Line;
});

console.log("Result one:", solveOne(data));
console.log("Result two:", solveTwo(data));
