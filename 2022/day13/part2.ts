const input = Deno.readTextFileSync("./input.txt")
                    .split("\n")
                    .filter(l => !!l)
                    .map(l => eval(l));

const compare = (l, r) => {
    // int,int
    if (Number.isInteger(l) && Number.isInteger(r)) {
        console.log('both integers', l, '<->', r);
        return l - r;
    }
    // [],int
    if (Array.isArray(l) && Number.isInteger(r)) {
        console.log('l array, r integer', l, '<->', r);
        return compare(l, [r]);
    }
    // int,[]
    if (Number.isInteger(l) && Array.isArray(r)) {
        console.log('l integer, r array', l, '<->', r);
        return compare([l], r);
    }
    // [],[]
    for (let i = 0; i < l.length; i++) {
        // right has run out of items so is greater
        if (i > r.length - 1) return 1;
        const comparison = compare(l[i], r[i]);
        if (comparison !== 0) return comparison;
    }
    // no differences in the array so check array size
    return l.length - r.length;
}

const parse = (lines) => {
    const linesToSort = [...lines, [[2]], [[6]]];
    linesToSort.sort((a, b) => compare(a,b));
    const index2 = linesToSort.findIndex(a => compare(a, [[2]]) === 0) + 1;
    const index6 = linesToSort.findIndex(a => compare(a, [[6]]) === 0) + 1;
    return index2 * index6;
}

console.log(parse(input));
