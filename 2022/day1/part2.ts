const input = await Deno.readTextFile("./input.txt");

const add = (a, b) => a + b;
const calories = input.split('\n\n').map((food) => food.split('\n').map(Number).reduce(add, 0));
const top3sum = calories.sort((a,b) => b - a).slice(0,3).reduce(add);

console.log(top3sum);