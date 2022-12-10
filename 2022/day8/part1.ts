const readForest = (): Array<Array<number>> =>
  Deno.readTextFileSync("./input.txt").split("\n")
    .filter(l => !!l)
    .map(l => [...l].map(Number))

const partition = (trees, pos: number) =>
  trees.reduce((result, tree, i) => {
    if (i !== pos) (i < pos) ? result[0].push(tree) : result[1].push(tree);
    return result;
  }, [[], []]);

const isVisible = (forest, col: number, row: number) => {
  const [left, right] = partition(forest[row], col);
  const [up, down] =  partition(forest.map((row) => row[col]), row);
  const visible = (trees) => trees.every(t => t < forest[row][col]);
  return visible(left) || visible(right) || visible(up) || visible(down);
}

const visibleTrees = (forest) =>
  forest.reduce((sum, row, j) =>
    sum + row.reduce((sum, col, i) => sum + isVisible(forest, i, j), 0), 0);

console.log(visibleTrees(readForest()));