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

const getNodesForPair = (a: Position, b: Position): [Position, Position] => {
  const d1 = distance(a, b);
  return [
    [b[0] + d1[0], b[1] + d1[1]],
    [a[0] - d1[0], a[1] - d1[1]],
  ];
};

const isWithinGrid = (grid: string[][], pos: Position): boolean =>
  pos[0] >= 0 && pos[0] < grid[0].length && pos[1] >= 0 && pos[1] < grid.length;

const getNodes = (grid: string[][], map: Map<string, Position[]>) => {
  const antennaPositions = [...map.entries()];
  const nodes: Position[] = [];
  for (let a = 0; a < antennaPositions.length; a++) {
    const [_, posList] = antennaPositions[a];
    for (let p = 0; p < posList.length; p++) {
      const currAntenna = posList[p];
      const others = [posList.slice(0, p), posList.slice(p + 1)].flat();
      for (let o = 0; o < others.length; o++) {
        const other = others[o];
        const nodePair = getNodesForPair(currAntenna, other);
        const validNodes = nodePair.filter((n) => isWithinGrid(grid, n));
        nodes.push(...validNodes);
      }
    }
  }
  return new Set(nodes.map((a) => a.join(",")));
};

console.log(getNodes(grid, buildPositionMap(grid)).size); // 308
