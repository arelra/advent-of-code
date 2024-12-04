const grid = (await Deno.readTextFile("./input.txt"))
  .split("\n")
  .map((line) => line.split(""));

const getCell = (grid: string[][], x: number, y: number): string | undefined =>
  x >= 0 && x < grid[0].length && y >= 0 && y < grid.length
    ? grid[y][x]
    : undefined;

const isXmas = (grid: string[][], cells: number[][]): number =>
  getCell(grid, cells[0][0], cells[0][1]) === "M" &&
  getCell(grid, cells[1][0], cells[1][1]) === "A" &&
  getCell(grid, cells[2][0], cells[2][1]) === "S"
    ? 1
    : 0;

const countXmas = (grid: string[][], x, y): number =>
  isXmas(grid, [[x, y - 1], [x, y - 2], [x, y - 3]]) + // N
  isXmas(grid, [[x + 1, y - 1], [x + 2, y - 2], [x + 3, y - 3]]) + // NE
  isXmas(grid, [[x + 1, y], [x + 2, y], [x + 3, y]]) + // E
  isXmas(grid, [[x + 1, y + 1], [x + 2, y + 2], [x + 3, y + 3]]) + // SE
  isXmas(grid, [[x, y + 1], [x, y + 2], [x, y + 3]]) + // S
  isXmas(grid, [[x - 1, y + 1], [x - 2, y + 2], [x - 3, y + 3]]) + // SW
  isXmas(grid, [[x - 1, y], [x - 2, y], [x - 3, y]]) + // W
  isXmas(grid, [[x - 1, y - 1], [x - 2, y - 2], [x - 3, y - 3]]); // NW

const checkGrid = (grid, sum = 0) => {
  for (let y = 0; y < grid.length; y++)
    for (let x = 0; x < grid[y].length; x++)
      sum += getCell(grid, x, y) === "X" ? countXmas(grid, x, y) : 0;
  return sum;
};

console.log(checkGrid(grid)); // 2685
