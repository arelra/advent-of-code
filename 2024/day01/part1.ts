const input = (await Deno.readTextFile("./input.txt")).split("\n");

let left: number[] = [];
let right: number[] = [];

for (let i = 0; i < input.length; i++) {
  const [l, r] = input[i].split("   ");
  left.push(Number(l));
  right.push(Number(r));
}

const leftSorted = left.sort((a, b) => a - b);
const rightSorted = right.sort((a, b) => a - b);
let sum = 0;

for (let i = 0; i < leftSorted.length; i++)
  sum += Math.abs(leftSorted[i] - rightSorted[i]);

console.log(sum); // 936063
