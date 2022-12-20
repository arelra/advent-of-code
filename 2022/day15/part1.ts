type Position = [number, number];

const distance = (pos1: Position, pos2: Position) =>
    Math.abs(pos2[0] - pos1[0]) + Math.abs(pos2[1] - pos1[1]);
    
const input = Deno.readTextFileSync("./input.txt")    
                    .split("\n")
                    .map(l => l.match(/(-?[0-9]+)/g))
                    .map(c => c.map(Number))
                    .map(c => ({ s: [c[0], c[1]], b: [c[2], c[3]] }));
                    
const getIntersectionRanges = (input, targetY) => {
    const ranges: number[][] = [];
    for (let i = 0; i < input.length; i++) {
        const { s, b } = input[i];
        const [sx, sy] = s;
        const d = distance(s, b);
        const crossesY = targetY >= s[1] - d && targetY <= s[1] + d;
        if (crossesY) {
            // y distance from this sensor to targetY
            const yDeltaToTarget = Math.abs(targetY - sy);
            // work out cells at intersection based on a diamond shape centered at sx, sy
            const coveredCellsAtIntersection = (d * 2 + 1) - (2 * yDeltaToTarget);
            const deltaX = (coveredCellsAtIntersection - 1) / 2;
            const range: number[]= [sx - deltaX, sx + deltaX];
            ranges.push(range);
        }
    }
    return ranges;
};

const getUncounted = (input, targetY) =>
    input.reduce((acc, {s,b}) => {
        if (s[1] === targetY) acc.push(s[0]);
        if (b[1] === targetY) acc.push(b[0]);
        return acc;        
    }, []);

const coveredCells = (ranges, uncounted) => {
    const minX = Math.min(...ranges.map(r => r[0]));
    const maxX = Math.max(...ranges.map(r => r[1]));
    // loop from min x intervals to max x
    let ans = 0;
    for (let x = minX; x < maxX + 1; x++) {
        // dont count beacons or sensors
        if (uncounted.find(u => u === x)) continue;
        // loop through intervals and check if this x is within the interval range
        for (let i = 0, x1, x2; i < ranges.length; [x1, x2] = ranges[i], i++)
            if (x >= x1 && x <= x2) { ans++; break; }
    }
    return ans;
}

const targetY = 2000000;
const ranges = getIntersectionRanges(input, targetY);
console.log(coveredCells(ranges, getUncounted(input, targetY)));