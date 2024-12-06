const grid: string[][] = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((line) => line.split(""));

type Game = {
  grid: string[][];
  pos: [number, number];
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

const move = (game: Game): boolean => {
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
  return cell !== "#";
};

const markVisited = (game: Game, pos: [number, number]) =>
  game.visited.add(`${pos[0]},${pos[1]}`);

const printGrid = (grid: string[][]) =>
  grid.reduce((acc, line) => `${acc}${line.join("")}\n`, "");

const play = (game: Game): number => {
  do {
    if (!move(game)) break;
  } while (true);
  return game.visited.size;
};

console.log(
  play({
    grid,
    pos: getStart(grid),
    dir: "^",
    visited: new Set(),
  })
); // 5329
