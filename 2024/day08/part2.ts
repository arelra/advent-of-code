const grid: string[][] = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((line) => line.split(""));

type Position = [number, number];

const buildPositionMap = (grid: string[][]): Map<string, Position[]> => {
  const map = new Map<string, Position[]>();
  for (let y = 0; y < grid.length; y++)
    for (let x = 0; x < grid[y].length; x++)
      if (grid[y][x] !== ".") {
        const posList = map.get(grid[y][x]) || [];
        posList.push([x, y]);
        map.set(grid[y][x], posList);
      }
  return map;
};

const distance = (a, b) => [b[0] - a[0], b[1] - a[1]];

const walkNodes = (a: Position, b: Position): Position[] => {
  const d1 = distance(a, b);
  const nodes: Position[] = [];
  while (true) {
    const next = [a[0] + d1[0], a[1] + d1[1]] as Position;
    if (!isWithinGrid(grid, next)) break;
    nodes.push(next);
    a = next;
  }
  while (true) {
    const next = [b[0] - d1[0], b[1] - d1[1]] as Position;
    if (!isWithinGrid(grid, next)) break;
    nodes.push(next);
    b = next;
  }
  return nodes;
};

const isWithinGrid = (grid: string[][], pos: Position): boolean =>
  pos[0] >= 0 && pos[0] < grid[0].length && pos[1] >= 0 && pos[1] < grid.length;

const printGrid = (grid: string[][]) =>
  grid.reduce((acc, line) => `${acc}${line.join("")}\n`, "");

const getNodes = (map: Map<string, Position[]>) => {
  const antennaePostions = [...map.entries()];
  const nodes: string[] = [];
  for (let a = 0; a < antennaePostions.length; a++) {
    const [_, antennae] = antennaePostions[a];
    for (let p = 0; p < antennae.length; p++) {
      const others = [antennae.slice(0, p), antennae.slice(p + 1)].flat();
      for (let o = 0; o < others.length; o++) {
        walkNodes(antennae[p], others[o]).forEach((n) =>
          nodes.push(`${n.join(",")}`)
        );
      }
    }
  }
  return new Set(nodes).size;
};

console.log(getNodes(buildPositionMap(grid))); // 1147
