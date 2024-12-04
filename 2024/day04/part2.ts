const grid = (await Deno.readTextFile("./input.txt"))
  .split("\n")
  .map((line) => line.split(""));

const getCell = (grid: string[][], x: number, y: number): string | undefined =>
  x >= 0 && x < grid[0].length && y >= 0 && y < grid.length
    ? grid[y][x]
    : undefined;

const isCross = (grid: string[][], x, y): number => {
  const ltr = `${getCell(grid, x - 1, y - 1)}${getCell(grid, x + 1, y + 1)}`;
  const rtl = `${getCell(grid, x - 1, y + 1)}${getCell(grid, x + 1, y - 1)}`;
  return (ltr === "MS" || ltr === "SM") && (rtl === "MS" || rtl === "SM")
    ? 1
    : 0;
};

const checkGrid = (grid, sum = 0) => {
  for (let y = 0; y < grid.length; y++)
    for (let x = 0; x < grid[y].length; x++)
      sum += getCell(grid, x, y) === "A" ? isCross(grid, x, y) : 0;
  return sum;
};

console.log(checkGrid(grid)); // 2048
