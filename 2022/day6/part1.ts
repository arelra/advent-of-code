for (let i = 0, line = Deno.readTextFileSync("./input.txt"); i < line.length; i++)
    if ((new Set(line.slice(i, i + 4).split(''))).size === 4) { console.log(i + 4); break; }