const input = Deno.readTextFileSync("./input.txt");
const priority = (code: number) =>
    code < 97 ? code - 38 : code - 96;
const findDuplicate = (first: string, second: string, third: string) => {
    const map = new Map();
    const update = (c, mask) => map.set(c, (map.get(c) ?? 0) | mask);
    first.split('').map((c) => update(c, 0x001));
    second.split('').map((c) => update(c, 0x010));
    third.split('').map((c) => update(c, 0x100));
    return ([...map].find(([k,v]) => v === 0x111))[0];
}
const lines = input.split('\n');
let sum = 0;
for (let i = 0; i < lines.length && lines[i]; i+=3) {
    sum += priority(findDuplicate(lines[i], lines[i+1], lines[i+2]).charCodeAt(0));
}
console.log(sum);