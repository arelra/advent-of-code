const readForest = (): Array<Array<Number>> =>
  Deno.readTextFileSync("./input.txt").split("\n")
    .filter(l => !!l)
    .map(l => [...l].map(Number))

const partition = (trees, pos: number) =>
  trees.reduce((result, tree, i) => {
    if (i !== pos) (i < pos) ? result[0].push(tree) : result[1].push(tree);
    return result;
  }, [[], []]);

const getDistance = (forest, col: number, row: number) => {
  const [left, right] = partition(forest[row], col);
  const [up, down] =  partition(forest.map((row) => row[col]), row);
  const getDistance = (trees) => {
    const distance = trees.findIndex(t => t >= forest[row][col]);
    return distance < 0 ? trees.length : (distance) + 1;
  };
  return getDistance(left.reverse()) * getDistance(right) * getDistance(up.reverse()) * getDistance(down);
}

const visibleTrees = (forest) =>
  forest.map((row, j) => row.map((col, i) => getDistance(forest, i, j))).flat();

console.log(visibleTrees(readForest()).sort((a,b) => b - a)[0]);