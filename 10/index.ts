const solveOne = (data: string[]) => {
  const scores: Record<string, number> = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };

  const closeToOpen: Record<string, string> = { ")": "(", "]": "[", "}": "{", ">": "<" };

  let count = 0;
  for (const line of data) {
    const stack = [];

    for (const char of [...line]) {
      if (Object.values(closeToOpen).includes(char)) {
        stack.push(char);
        continue;
      }

      if (stack.length === 0 || stack.pop() !== closeToOpen[char]) {
        count += scores[char];
        break;
      }
    }
  }

  return count;
};

const solveTwo = (data: string[]) => {
  const scores: Record<string, number> = {
    "(": 1,
    "[": 2,
    "{": 3,
    "<": 4,
  };

  const closeToOpen: Record<string, string> = { ")": "(", "]": "[", "}": "{", ">": "<" };

  const totals: number[] = [];
  for (const line of data) {
    let stack: string[] = [];

    for (const char of [...line]) {
      if (Object.values(closeToOpen).includes(char)) {
        stack.push(char);
        continue;
      }

      if (stack.length === 0 || stack.pop() !== closeToOpen[char]) {
        stack = [];
        break;
      }
    }

    if (stack.length > 0) {
      let subtotal = 0;

      for (const char of stack.reverse()) {
        subtotal = 5 * subtotal + scores[char];
      }

      totals.push(subtotal);
    }
  }

  return totals.sort((a, z) => a - z)[Math.floor(totals.length / 2)];
};

const url = new URL("input.txt", import.meta.url);
const data = (await Deno.readTextFile(url)).split("\n");

console.log("Result one:", solveOne(data));
console.log("Result two:", solveTwo(data));
