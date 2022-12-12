type Monkey = {
    items: number[],
    inspect: (item: number) => number,
    testDivide: number,
    throwTo: (item: number) => number,
    inspected: number,
};

const parse = (paragraphs): Array<Monkey> =>
    paragraphs.reduce((monkeys, paragraph) => {
        const lines = paragraph.split('\n')
        const items = lines[1].substr(18).split(',').map(n => Number(n.trim(n)));
        const inspect = { op: lines[2].substr(23, 1), val: lines[2].substr(25)};
        const throwTo = { div: lines[3].substr(21), t: lines[4].substr(29), f: lines[5].substr(30)};
        const monkey: Monkey = {
            items,
            inspect: inspect.op === '+' ? (i) => i + Number(inspect.val) : (i) => i * (inspect.val === 'old' ? i : Number(inspect.val)),
            testDivide: Number(throwTo.div),
            throwTo: (w) => w % Number(throwTo.div) === 0 ? throwTo.t : throwTo.f,
            inspected: 0,
        }
        return monkeys.push(monkey) && monkeys;
    }, []);

const game = (monkeys: Array<Monkey>, rounds: number) => {
    const modulus = monkeys.reduce((res, monkey) => res * monkey.testDivide, 1);
    for (let r = 0; r < rounds; r++)
        for (let m = 0; m < monkeys.length; m++) {
            const monkey = monkeys[m];
            const { items, inspect, throwTo } = monkey;
            for (let i = 0; i < items.length; i++) {
                const item = inspect(items[i]) % modulus;
                monkeys[throwTo(item)].items.push(item);
                monkey.inspected++;
            }
            monkey.items = [];
        }
    return monkeys;
}

console.log(game(parse(Deno.readTextFileSync("./input.txt").split("\n\n")), 10000)
    .sort((a,b) => b.inspected - a.inspected)
    .slice(0,2)
    .reduce((res, i) => res * i.inspected, 1));