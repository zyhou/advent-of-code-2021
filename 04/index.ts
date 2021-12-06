type Board = (number | null)[][];

const isWon = (board: Board) => {
  for (const line of board) {
    if (line.every((val) => val === null)) return true;
  }
  for (let i = 0; i < board[0].length; i++) {
    if (board.every((line) => line[i] === null)) return true;
  }
  return false;
};

const hitBoard = (board: Board, n: number) => {
  board.forEach((line, y) => {
    line.forEach((cell, x) => {
      if (cell === n) {
        board[y][x] = null;
      }
    });
  });
};

const getScore = (board: Board) => {
  let value = 0;
  board.forEach((line) => {
    line.forEach((cell) => {
      if (cell !== null) {
        value = value + cell;
      }
    });
  });
  return value;
};

const getBingo = (data: string[]) => {
  const numbers = data[0].split(",").map((n) => parseInt(n, 10));
  const boards = data.slice(1).map<Board>((boards) => {
    const board = boards.split(/\n\W*/).map((row) =>
      row.trim().split(/\W+/).map((n) => parseInt(n, 10))
    );
    return board;
  });

  return { numbers, boards };
};

const solveOne = (data: string[]) => {
  const { numbers, boards } = getBingo(data);

  for (const number of numbers) {
    for (const board of boards) {
      hitBoard(board, number);
      if (isWon(board)) {
        return getScore(board) * number;
      }
    }
  }
};

const solveTwo = (data: string[]) => {
  const { numbers, boards } = getBingo(data);

  for (const number of numbers) {
    for (let i = 0; i < boards.length; i++) {
      const board = boards[i];
      hitBoard(board, number);
      if (isWon(board)) {
        if (boards.length === 1) {
          return getScore(board) * number;
        }
        boards.splice(i, 1);
      }
    }
  }
};

const url = new URL("input.txt", import.meta.url);
const data = (await Deno.readTextFile(url)).split("\n\n");

console.log("Result one:", solveOne(data));
console.log("Result two:", solveTwo(data));
