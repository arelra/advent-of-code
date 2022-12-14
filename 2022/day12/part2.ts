const input = Deno.readTextFileSync("./input.txt").split("\n").map(l => l.split(''));

type Step = { row: number; column: number; distance: number; }

const find = (grid, letter: string, replace: string): number[] | undefined => {
    for (let r = 0; r < grid.length; r++)
        for (let c = 0; c < grid[0].length; c++)
            if (grid[r][c] === letter) { grid[r][c] = replace; return [r,c]; }
}

const isOutSideOfGrid = (step, rows, columns) =>
    step[0] < 0 || step[0] >= rows || step[1] < 0 || step[1] >= columns;

const canMove = (grid, step, nextStep) =>
    grid[step[0]][step[1]].charCodeAt(0) - grid[nextStep[0]][nextStep[1]].charCodeAt(0) <= 1

const skipStep = (grid, rows, columns, step, nextStep, visited) =>
    isOutSideOfGrid(nextStep, rows, columns)
        || visited.includes(nextStep.join('.'))
        || !canMove(grid, step, nextStep);

const search = (grid) => {
    const H = grid.length;
    const W = grid[0].length;
    const start = find(grid, 'S', 'a') ?? [];
    const end = find(grid, 'E', 'z') ?? [];
    const [startRow, startColumn] = end;
    const queue: Array<Step> = [];
    queue.push({ row: startRow, column: startColumn, distance: 0 });
    const visited = [end.join('.')];

    while (queue.length) {
        const nextStep = queue.shift();
        if (nextStep) {
            const { row, column, distance } = nextStep;
            const steps = [[row - 1, column], [row, column - 1], [row + 1, column], [row, column + 1]];
            for (let s = 0; s < 4; s++) {
                const step = steps[s];
                if (skipStep(grid, H, W, [row, column], step, visited)) continue;
                if (grid[step[0]][step[1]] === 'a') return distance + 1;
                visited.push(step.join('.'));
                queue.push({ row: step[0], column: step[1], distance: distance + 1});
            }
        }
    }
}

console.log(search(input));