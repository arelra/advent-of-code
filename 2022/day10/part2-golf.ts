for (let [width, lines, clock, x, tick, line, crt] = [40, Deno.readTextFileSync("./input.txt").split("\n"), 1, 1, 0, 0, Array()]; lines[line] || tick > 0; tick--, clock++) {
  const [command, arg] = lines[line].split(' ');
  crt[clock - 1] = Math.abs(clock - (Math.floor(clock / width) * width + x + 1)) < 2 ? '#': '.';
  if (tick === 0) (tick = command === 'noop' ? 1 : 2);
  if (tick === 1) (x+= Number(arg ?? 0), line++);
  if (line === lines.length - 1) while(crt.length) console.log(crt.splice(0, width).join(''));
};