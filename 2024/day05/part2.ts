const [block1, block2] = (await Deno.readTextFile("./input.txt")).split("\n\n");
const pages = block1
  .split("\n")
  .map((l) => l.split("|").map(Number)) as number[][];
const updates = block2
  .split("\n")
  .map((l) => l.split(",").map(Number)) as number[][];

type PageOrderMap = Record<number, number[]>; // Map<pageNumber, numbersLessThan[]>

const createPageOrderMap = (pages: number[][]) =>
  pages.reduce((map, [leftPage, rightPage]) => {
    map[leftPage] = (map[leftPage] || []).concat(rightPage);
    map[rightPage] = map[rightPage] || [];
    return map;
  }, {} as PageOrderMap);

const compare = (pageOrderMap: PageOrderMap, a: number, b: number) =>
  pageOrderMap[a].includes(b) ? -1 : 1;

const checkUpdates = (
  pageOrderMap: PageOrderMap,
  updates: number[][]
): number =>
  updates
    .map((update) => {
      const isLineOk = update.every((page, i) =>
        update.slice(i + 1).every((num) => pageOrderMap[page].includes(num))
      );
      return isLineOk
        ? 0
        : update.sort((a, b) => compare(pageOrderMap, a, b))[
            Math.floor(update.length / 2)
          ];
    })
    .reduce((acc, n) => acc + n, 0);

console.log(checkUpdates(createPageOrderMap(pages), updates)); // 6456
