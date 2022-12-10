const [width, height, lines] = [40, 6, Deno.readTextFileSync("./input.txt").split("\n")];

const cpu = (program: string[]) => {
  let [clock, x, tick, line, row] = [1, 1, 0, 0, 0];
  const crt: string[] = Array(width * height).fill('.');
  do {
    const sprite = row * width + x + 1;
    (clock >= sprite - 1 && clock <= sprite + 1) ? crt[clock - 1] = '#': crt[clock - 1] = '.';
    const [command, arg] = program[line].split(' ');
    if (tick === 0) tick = command === 'noop' ? 1 : 2;
    tick--;
    if (tick === 0) (x+= Number(arg ?? 0), line++);
    clock++;
    if (clock % width === 0) row++;
  } while (program[line] || tick > 0);
  return crt;
}

for (let j = 0, crt = cpu(lines); j < height; j++)
  console.log(crt.slice(j* width, (j * width) + width).join(''));