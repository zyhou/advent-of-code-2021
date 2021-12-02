type Command = {
  action: "forward" | "down" | "up";
  units: number;
};

const solveOne = (commands: Command[]) => {
  let position = 0;
  let depth = 0;

  for (let index = 0; index < commands.length; index++) {
    const command = commands[index];
    switch (command.action) {
      case "forward":
        position += command.units;
        break;
      case "down":
        depth += command.units;
        break;
      case "up":
        depth -= command.units;
        break;
      default:
        break;
    }
  }

  return position * depth;
};

const solveTwo = (commands: Command[]) => {
  let position = 0;
  let depth = 0;
  let aim = 0;

  for (let index = 0; index < commands.length; index++) {
    const command = commands[index];
    switch (command.action) {
      case "forward":
        position += command.units;
        depth += command.units * aim;
        break;
      case "down":
        aim += command.units;
        break;
      case "up":
        aim -= command.units;
        break;
      default:
        break;
    }
  }

  return position * depth;
};

const url = new URL("input.txt", import.meta.url);
const commands = (await Deno.readTextFile(url)).split("\n").map((line) => {
  const [action, units] = line.split(" ");
  return { action, units: parseInt(units, 10) } as Command;
});

console.log("Result one:", solveOne(commands));
console.log("Result two:", solveTwo(commands));
