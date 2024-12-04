const input = (await Deno.readTextFile("./input.txt"))
  .split("\n")
  .map((l) => l.split(" ").map(Number));

const direction = (a: number, b: number) => Math.sign(a - b);

const createCandidates = (line: number[], candidates = []): number[][] =>
  Array(line.length)
    .fill([])
    .reduce(
      (acc, _, i) => [...acc, [...line.slice(0, i), ...line.slice(i + 1)]],
      []
    );

const isLineOk = (line: number[]): boolean => {
  let lineOk = true;
  let prevDirection = direction(line[0], line[1]);
  for (let j = 0; j < line.length - 1; j++) {
    const next = line[j + 1];
    const diff = Math.abs(line[j] - next);
    const thisDirection = direction(line[j], next);
    const sameDirection = thisDirection === prevDirection;
    const diffWithinLimit = diff > 0 && diff < 4;
    prevDirection = thisDirection;
    if (!sameDirection || !diffWithinLimit) {
      lineOk = false;
      break;
    }
  }
  return lineOk;
};

console.log(
  input.reduce(
    (sum, line) => sum + (createCandidates(line).some(isLineOk) ? 1 : 0),
    0
  )
); // 665
