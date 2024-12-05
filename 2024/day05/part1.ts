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

const checkUpdates = (
  pageOrderMap: PageOrderMap,
  updates: number[][]
): number =>
  updates
    .map((numbers) => {
      const isLineOk = numbers.every((page, i) =>
        numbers.slice(i + 1).every((num) => pageOrderMap[page].includes(num))
      );
      return isLineOk ? numbers[Math.floor(numbers.length / 2)] : 0;
    })
    .reduce((acc, n) => acc + n, 0);

console.log(checkUpdates(createPageOrderMap(pages), updates)); // 4569
