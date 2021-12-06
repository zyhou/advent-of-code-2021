type Coord = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

const solveOne = (data: Coord[]) => {
  const positions: Record<string, number> = {};

  for (const { x1, x2, y1, y2 } of data) {
    const [startX, endX] = [Math.min(x1, x2), Math.max(x1, x2)];
    const [startY, endY] = [Math.min(y1, y2), Math.max(y1, y2)];

    if (startX === endX || startY === endY) {
      for (let x = startX; x <= endX; x++) {
        for (let y = startY; y <= endY; y++) {
          const position = `${x},${y}`;
          positions[position] = positions[position] ? positions[position] += 1 : 1;
        }
      }
    }
  }

  return Object.values(positions).filter((position) => position > 1).length;
};

const solveTwo = (data: Coord[]) => {
  const positions: Record<string, number> = {};

  for (const { x1, x2, y1, y2 } of data) {
    const [startX, endX] = [Math.min(x1, x2), Math.max(x1, x2)];
    const [startY, endY] = [Math.min(y1, y2), Math.max(y1, y2)];

    if (x1 === x2 || y1 === y2) {
      for (let x = startX; x <= endX; x++) {
        for (let y = startY; y <= endY; y++) {
          const position = `${x},${y}`;
          positions[position] = positions[position] ? positions[position] += 1 : 1;
        }
      }
    } else {
      const xDown = x1 > x2;
      const yDown = y1 > y2;
      let y = y1;

      if (xDown) {
        for (let x = x1; x >= x2; x--) {
          const position = `${x},${y}`;
          positions[position] = positions[position] ? positions[position] += 1 : 1;
          y = yDown ? y - 1 : y + 1;
        }
      } else {
        for (let x = x1; x <= x2; x++) {
          const position = `${x},${y}`;
          positions[position] = positions[position] ? positions[position] += 1 : 1;
          y = yDown ? y - 1 : y + 1;
        }
      }
    }
  }

  return Object.values(positions).filter((position) => position > 1).length;
};

const url = new URL("input.txt", import.meta.url);
const data = (await Deno.readTextFile(url)).split("\n").map((line) => {
  const [x, y] = line.split("->");
  const [x1, y1] = x.split(",").map(Number);
  const [x2, y2] = y.split(",").map(Number);

  return {
    x1,
    x2,
    y1,
    y2,
  } as Coord;
});

console.log("Result one:", solveOne(data));
console.log("Result one:", solveTwo(data));
