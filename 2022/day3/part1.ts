const input = await Deno.readTextFile("./input.txt");

const priority = (ch: string) => {
    const code = ch.charCodeAt(0);
    return code < 97 ? code - 38 : code - 96;
}

const findDuplicate = (rucksack: string) => {
    const first = rucksack.slice(0, rucksack.length / 2);
    const second = rucksack.slice(rucksack.length / 2);
    const map = first.split('').reduce((acc, c) => { acc[c] = 1; return acc }, {});
    return second.split('').find(c => map[c] === 1);
}

const result = input.split('\n').reduce((sum, rucksack) => {
    const duplicate = findDuplicate(rucksack);
    return sum + (duplicate ? priority(duplicate) : 0);
}, 0);

console.log(result);