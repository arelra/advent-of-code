for (let i = 0, line = Deno.readTextFileSync("./input.txt"); i < line.length; i++)
    if ((new Set(line.slice(i, i + 14).split(''))).size === 14) { console.log(i + 14); break; }