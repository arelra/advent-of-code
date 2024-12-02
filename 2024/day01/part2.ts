const input = (await Deno.readTextFile("./input.txt")).split("\n");

let left: number[] = [];
let right: number[] = [];

for (let i = 0; i < input.length; i++) {
  const [l, r] = input[i].split("   ");
  left.push(Number(l));
  right.push(Number(r));
}

console.log(
  left.reduce((sum, l) => sum + l * right.filter((i) => i === l).length, 0)
); // 23150395
