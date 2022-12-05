const lines = Deno.readTextFileSync("./input.txt").split('\n');
const stacks = Array.from(new Array((lines[0].length + 1) / 4), () => new Array());
let stackLines = 0;
for (let i = 0; i < lines.length && lines[i]; i++, stackLines++)
    [...lines[i]].forEach((char, j) => char.match(/[A-Za-z]/) && (stacks[Math.floor(j / 4)].push(char)))
for (let i = stackLines + 1; i < lines.length && lines[i]; i++) {
    const [, count, , from, , to] = lines[i].split(' ');
    stacks[to-1].unshift(...stacks[from-1].splice(0, count));
}
console.log(stacks.map(s => s[0]).join(''));