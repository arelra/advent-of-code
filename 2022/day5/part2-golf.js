const lines = Deno.readTextFileSync("./input.txt").split('\n');
const stacks = Array.from(new Array((lines[0].length + 1) / 4), () => new Array());
for (let i = 0, count, from, to ; i < lines.length; i++, [, count, , from, , to] = (lines[i] || '').split(' '))
    !(lines[i] || '').startsWith('m') ? [...lines[i]].forEach((char, j) => char.match(/[A-Za-z]/) && (stacks[Math.floor(j / 4)].push(char))) : stacks[to-1].unshift(...stacks[from-1].splice(0, count));
console.log(stacks.map(s => s[0]).join(''));