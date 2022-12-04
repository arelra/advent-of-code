const lines = Deno.readTextFileSync("./input.txt").split('\n');
for (let i = 0, sum = 0, map = new Map(); i < lines.length && lines[i]; i+=3, map = new Map()) {
    [lines[i], lines[i+1], lines[i+2]].forEach((line, i) => line.split('').map(c => map.set(c, (map.get(c) ?? 0) | 1 << i)));
    const charCode = ([...map].find(([_,v]) => v === 0b111)[0]).charCodeAt(0);
    sum += charCode < 97 ? charCode - 38 : charCode - 96;
    if (i === lines.length - 4) console.log(sum);
}