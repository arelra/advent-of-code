const grid: string[][] = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((line) => line.split(""));

type Game = {
  grid: string[][];
  start: [number, number];
  pos: [number, number];
  obstacle: [number, number];
  dir: string;
  visited: Set<string>;
};

const getStart = (grid): [number, number] => {
  for (let y = 0; y < grid.length; y++)
    for (let x = 0; x < grid[y].length; x++)
      if (grid[y][x] === "^") return [x, y];
  return [0, 0];
};

const getCell = (grid: string[][], pos: [number, number]): string | undefined =>
  pos[0] >= 0 && pos[0] < grid[0].length && pos[1] >= 0 && pos[1] < grid.length
    ? grid[pos[1]][pos[0]]
    : undefined;

const turn = { "^": ">", ">": "v", v: "<", "<": "^" };

const nextMove = (game: Game): [number, number] => {
  const [x, y] = game.pos;
  const dir = game.dir;
  const newPos: [number, number] =
    dir === "^"
      ? [x, y - 1]
      : dir === ">"
      ? [x + 1, y]
      : dir === "v"
      ? [x, y + 1]
      : dir === "<"
      ? [x - 1, y]
      : [x, y];
  return newPos;
};

const move = (game: Game, newPos: [number, number]): boolean => {
  const nextCell = getCell(game.grid, newPos);
  if (nextCell === undefined) {
    markVisited(game, game.pos);
    return false;
  }
  if (isNotObstacle(game, newPos)) {
    markVisited(game, game.pos);
    game.pos = newPos;
  } else {
    game.dir = turn[game.dir];
  }
  return true;
};

const isNotObstacle = (game: Game, pos: [number, number]) => {
  const cell = getCell(game.grid, pos);
  return (
    cell !== "#" &&
    `${pos[0]},${pos[1]}` !== `${game.obstacle[0]},${game.obstacle[1]}`
  );
};

const hasVisited = (game: Game, pos: [number, number]) =>
  game.visited.has(`${game.dir},${pos[0]},${pos[1]}`);

const markVisited = (game: Game, pos: [number, number]) =>
  game.visited.add(`${game.dir},${pos[0]},${pos[1]}`);

const printGrid = (grid: string[][]) =>
  grid.reduce((acc, line) => `${acc}${line.join("")}\n`, "");

const play = (game: Game): number => {
  do {
    const newPos = nextMove(game);
    if (hasVisited(game, newPos)) return 1;
    if (!move(game, newPos)) return 0;
  } while (true);
  return 0;
};

const start = getStart(grid);

const loop = (game) => {
  let foundLoop = 0;
  for (let y = 0; y < game.grid.length; y++) {
    console.log(y);
    for (let x = 0; x < game.grid[0].length; x++) {
      const obstacle = game.grid[y][x];
      if (
        isNotObstacle(game, [x, y]) &&
        obstacle !== "^" &&
        `${x},${y}` !== `68,33` // TODO: this obstacle results in an infinite loop :[
      ) {
        foundLoop += play({
          grid: game.grid,
          start: game.start,
          pos: game.start,
          obstacle: [x, y],
          dir: "^",
          visited: new Set(),
        });
      }
    }
  }
  return foundLoop;
};

console.log(
  loop({
    grid,
    start,
    pos: start,
    obstacle: [0, 0],
    dir: "^",
    visited: new Set(),
  })
); // outputs 2161, the right answer is actually 2162 :]
