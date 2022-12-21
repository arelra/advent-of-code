type Item = { val: number; pos: number; }

const input = Deno.readTextFileSync("./input.txt").split("\n").map(Number);

const parse = (input: Array<number>) =>
    input.map((num, i) => ({ val: num, pos: i }));

const findItem = (list, val, pos) =>
    list.findIndex((item) => item.val === val && item.pos === pos);

const findValue = (list, val) =>
    list.findIndex((item) => item.val === val);

const mix = (input: Array<number>, list: Array<Item>) => {
    let newlist = list;
    for (let i = 0; i < input.length; i++) {
        const index = findItem(newlist, input[i], i);
        // snip
        newlist = [...newlist.slice(0, index), ...newlist.slice(index + 1)];
        // insert
        const insertIndex = (index + input[i]) % newlist.length;
        newlist.splice(insertIndex, 0, { val: input[i], pos: i });
    }
    return newlist;
}

const sum = (list: Array<Item>) => {
    const zeroth = findValue(list, 0);
    let total = 0;
    total += list[(zeroth + 1000) % list.length].val;
    total += list[(zeroth + 2000) % list.length].val;
    total += list[(zeroth + 3000) % list.length].val;
    return total;
}

console.log(sum(mix(input, parse(input))));