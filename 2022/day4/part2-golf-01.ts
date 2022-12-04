const lines = Deno.readTextFileSync("./input.txt").split('\n');
for (let i = 0, sum = 0; i < lines.length && lines[i]; i++) {
    const [[aStart, aEnd], [bStart, bEnd]] = lines[i].split(',').map(pair => pair.split('-').map(Number));
    if (((aStart <= bEnd) && (bEnd <= aEnd)) || ((bStart <= aEnd) && (aEnd <= bEnd))) sum++;
    if (i === lines.length - 2) console.log(sum);
}