const input = Deno.readTextFileSync("./test.txt").split("\n");

const parse = (input: Array<string>) =>
    input.reduce((map, line) => {
        const [name, formula] = line.split(':');
        const [m1, op, m2] = formula.trim().split(' ');
        if (Number.isInteger(Number(m1))) map[name] = { hasVal: true, f: Number(m1)};
        else map[name] = { hasVal: false, f: {m1, op, m2} };
        return map;
    }, {});

const resolve = (monkeys, monkey: string) => {
    const job = monkeys[monkey];
    if (job.hasVal) return job.f;
    const {m1, op, m2} = job.f;
    if (op === '+') return resolve(monkeys, m1) + resolve(monkeys, m2);
    if (op === '-') return resolve(monkeys, m1) - resolve(monkeys, m2);
    if (op === '*') return resolve(monkeys, m1) * resolve(monkeys, m2);
    if (op === '/') return resolve(monkeys, m1) / resolve(monkeys, m2);
}

console.log(resolve(parse(input), 'root'));