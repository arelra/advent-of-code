const input = Deno.readTextFileSync("./input.txt").split("\n");

const parse = (input: Array<string>) =>
    input.reduce((map, line) => {
        const [name, formula] = line.split(':');
        const [m1, op, m2] = formula.trim().split(' ');
        if (Number.isInteger(Number(m1))) map[name] = { hasVal: true, f: Number(m1)};
        else map[name] = { hasVal: false, f: {m1, op, m2} };
        return map;
    }, {});

const resolve = (monkeys, monkey: string, guess: number) => {
    if (monkey === 'humn') return guess;
    const job = monkeys[monkey];
    if (job.hasVal) return job.f;
    const {m1, op, m2} = job.f;
    if (monkey === 'root') return resolve(monkeys, m1, guess) - resolve(monkeys, m2, guess);
    if (op === '+') return resolve(monkeys, m1, guess) + resolve(monkeys, m2, guess);
    if (op === '-') return resolve(monkeys, m1, guess) - resolve(monkeys, m2, guess);
    if (op === '*') return resolve(monkeys, m1, guess) * resolve(monkeys, m2, guess);
    if (op === '/') return resolve(monkeys, m1, guess) / resolve(monkeys, m2, guess);
}

const search = (monkeys) => {
    let left = Math.pow(-2, 50);
    let right = Math.pow(2, 50);
    let mid = 0;
    let count = 0;
    while (true) {
        const result = resolve(monkeys, 'root', mid);
        console.log('checking: ', mid, result, ++count);
        if (result === 0) break;
        if (result < 0) left = mid;
        else right = mid;
        mid = Math.floor((right + left) / 2);
    }
    return mid;
}

console.log(search(parse(input)));