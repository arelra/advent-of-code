const lines = Deno.readTextFileSync("./input.txt").split('\n');
const priority = (code: number) => code < 97 ? code - 38 : code - 96;
const findDuplicate = (group, map = new Map()) => {
    group.forEach((line, i) => line.split('').map(c => map.set(c, (map.get(c) ?? 0) | 1 << i)));
    return ([...map].find(([_,v]) => v === 0b111))[0];
}
for (let i = 0, sum = 0; i < lines.length && lines[i]; i+=3) {
    sum += priority(findDuplicate([lines[i], lines[i+1], lines[i+2]]).charCodeAt(0));
    if (i === lines.length - 4) console.log(sum);
}