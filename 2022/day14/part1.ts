const input = Deno.readTextFileSync("./test.txt")
                    .split("\n")
                    .filter(l => !!l.trim().length)
                    .map(ls => ls.trim().split(' -> '))
                    .map(paths => paths.map(path => path.split(',').map(Number)));

const read = (grid, pos) =>
    grid[`${pos[0]}-${pos[1]}`];
                
const write = (grid, pos, char) =>
    grid[`${pos[0]}-${pos[1]}`] = char;

const cave = (scans) => {
    const grid = {};
    let maxY = -1;
    for (let s = 0; s < scans.length; s++)
        for (let p = 0; p < scans[s].length - 1; p++) {
            const [start, end] = [scans[s][p], scans[s][p+1]];
            const [x1, y1] = start;
            const [x2, y2] = end;
            const [dx, dy] = [x2 - x1, y2 - y1];
            const [xstep, ystep] = [Math.sign(dx), Math.sign(dy)];
            if (dx) for(let x = 0, xpos = x1; x <= Math.abs(dx); x++, xpos+=xstep) {
                write(grid, [xpos, y1], '#');
            }
            if (dy) for(let y = 0, ypos = y1; y <= Math.abs(dy); y++, ypos+=ystep) {
                write(grid, [x1, ypos], '#');
                if (ypos > maxY) maxY = ypos;
            }
        }
    return [grid, maxY];
};

const display = (grid) => {
    for (let y = 0; y < 10; y++) {
        let line = '';
        for (let x = 494; x < 504; x++) {
            line += read(grid, [x,y]) ? read(grid, [x,y]) : '.';
        }
        if (line.length) console.log(y, line);
    }
};

const canMoveTo = (grid, pos) =>
    read(grid, pos) !== '#' && read(grid, pos) !== 'O';

const fill = (grid, maxY) => {
    let count = 0;
    let canMove = true;
    while (canMove) {
        let pos = [500,0];
        let atRest = false;
        let down = [pos[0], pos[1] + 1];
        let left = [pos[0] -1, pos[1] + 1];
        let right = [pos[0] +1, pos[1] + 1];
        canMove = canMoveTo(grid, down) || canMoveTo(grid, left) || canMoveTo(grid, right);
        while (!atRest && canMove) {
            down = [pos[0], pos[1] + 1];
            left = [pos[0] -1, pos[1] + 1];
            right = [pos[0] +1, pos[1] + 1];
            if (down[1] > maxY) return [grid, count];
            if (canMoveTo(grid, down)) {
                pos = down;
                continue;
            }
            if (canMoveTo(grid, left)) {
                pos = left;
                continue;
            }
            if (canMoveTo(grid, right)) {
                pos = right;
                continue;
            }
            write(grid, pos, 'O');
            atRest = true;
        }
        count++;
    }
    return [grid, count];
}

const [grid, maxY] = cave(input);
const [filledGrid, count] = fill(grid, maxY);
display(filledGrid);
console.log(count);