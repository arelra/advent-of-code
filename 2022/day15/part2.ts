type Position = [number, number];

const distance = (pos1: Position, pos2: Position) =>
    Math.abs(pos2[0] - pos1[0]) + Math.abs(pos2[1] - pos1[1]);
    
const input = Deno.readTextFileSync("./input.txt")    
                    .split("\n")
                    .map(l => l.match(/(-?[0-9]+)/g))
                    .map(c => c.map(Number))
                    .map(c => ({ s: [c[0], c[1]], b: [c[2], c[3]] }));

const getBoundaryCells = (input, max) => {
    const cells: Array<Position> = [];
    for (let i = 0; i < input.length; i++) {
        const { s, b } = input[i];
        const [sx, sy] = s;
        const d = distance(s, b) + 1;
        // get all the cells directly outside the perimeter of this sensor
        for (let decx = d, incx = 0; decx >=  0; decx--, incx++) {
            if ((sx + incx > max) || sx - incx < 0) continue;
            if ((sy + incx > max) || sy - incx < 0) continue;
            if ((sx + decx > max) || sx - decx < 0) continue;
            if ((sy + decx > max) || sy - decx < 0) continue;
            // top right
            cells.push([sx + incx, sy - decx]);
            // bottom right
            cells.push([sx + decx, sy + incx]);
            // bottom left
            cells.push([sx - incx, sy + decx]);
            // top left
            cells.push([sx - decx, sy - incx]);
        }
    }
    return cells;
};

const findUnreachable = (cells: Array<Position>, sensors) => {
    // find the perimeter cell that is not reachable by any sensor
    for (let c = 0; c < cells.length; c++) {
        const cell = cells[c];
        let covered = false;
        for (let si = 0; si < sensors.length; si++) {
            const { s, b } = sensors[si];
            if (distance(s, cell) <= distance(s, b)) covered = true;
        }
        if (!covered) return cell;
    }
    return [];
}

const [x, y] = findUnreachable(getBoundaryCells(input, 4000000), input);
console.log((x * 4000000) + y);