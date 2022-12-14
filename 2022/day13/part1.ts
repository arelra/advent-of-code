const input = Deno.readTextFileSync("./input.txt")
                    .split("\n\n")
                    .map(ls => ls.split('\n'))
                    .map(ls => [eval(ls[0]), eval(ls[1])] );

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

const parse = (pairs) => {
    const result = [];
    for (let pair = 0; pair < pairs.length; pair++) {
        let left = pairs[pair][0];
        let right = pairs[pair][1];
        console.log('----');
        console.log('comparing', pair + 1, left, right);
        const comparison = compare(left, right);
        if (comparison < 0 ) { console.log('LESS!', pair + 1); result.push(pair + 1); }
        if (comparison === 0) console.log('EQUAL!', pair + 1);
        if (comparison > 0) console.log('GREATER!', pair + 1);
    }
    console.log(result);
    return result.reduce((sum, i) => sum + i, 0);
}

console.log(parse(input));
