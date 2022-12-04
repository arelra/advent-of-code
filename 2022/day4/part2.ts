const lines = Deno.readTextFileSync("./input.txt").split('\n');
for (let i = 0, sum = 0; i < lines.length && lines[i]; i++) {
    const [a, b] = lines[i].split(',');
    const [aStart, aEnd] = a.split('-').map(Number);
    const [bStart, bEnd] = b.split('-').map(Number);
    if (((aStart <= bEnd) && (bEnd <= aEnd)) || ((bStart <= aEnd) && (aEnd <= bEnd))) sum++;
    if (i === lines.length - 2) console.log(sum);
}