const cpu = (program: string[]) => {
  let [clock, x, tick, line] = [1, 1, 0, 0];
  let strength: number[] = [];
  do {
    const [command, arg] = program[line].split(' ');
    if (tick === 0) tick = command === 'noop' ? 1 : 2;
    tick--;
    if (tick === 0) (x+= Number(arg ?? 0), line++);
    clock++;
    if (clock === 20 || (clock - 20) % 40 === 0) strength.push(clock * x);
  } while (program[line] || tick > 0);
  return strength.reduce((res, s) => res + s, 0);
}

console.log(cpu(Deno.readTextFileSync("./input.txt").split("\n")));