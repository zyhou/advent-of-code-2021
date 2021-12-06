const solveOne = (data: number[]) => {
  const totalDays = 80;
  let days = [...data];

  for (let index = 0; index < totalDays; index++) {
    const newDays = [];
    for (const day of days) {
      if (day === 0) {
        newDays.push(6);
        newDays.push(8);
      } else {
        newDays.push(day - 1);
      }
    }
    days = newDays;
  }

  return days.length;
};

const solveTwo = (data: number[]) => {
  let days = new Map<number, number>();

  for (const day of data) {
    const current = days.get(day);
    if (current !== undefined) {
      days.set(day, current + 1);
    } else {
      days.set(day, 1);
    }
  }

  const totalDays = 256;
  for (let index = 0; index < totalDays; index++) {
    const newDays = new Map<number, number>();
    for (const [day, count] of days) {
      if (day === 0) {
        newDays.set(6, (newDays.get(6) || 0) + count);
        newDays.set(8, (newDays.get(8) || 0) + count);
      } else {
        newDays.set(day - 1, (newDays.get(day - 1) || 0) + count);
      }
    }
    days = newDays;
  }

  let sum = 0;
  days.forEach((v) => {
    sum += v;
  });

  return sum;
};

const url = new URL("input.txt", import.meta.url);
const data = (await Deno.readTextFile(url)).split(",").map(Number);

console.log("Result one:", solveOne(data));
console.log("Result two:", solveTwo(data));
