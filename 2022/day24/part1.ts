type Position = [number, number];
type World = {
    walls: Set<string>;
    blizzards: Map<string, Array<string>>;
    entry: Position;
    exit: Position;
    player: Position;
    width: number;
    height: number;
    time: number;
};
type Blizzard = '^' | '>' | 'v' | '<';

const key = (p: Position): string => `${p[0]}.${p[1]}`;

const toPos = (p: string) => p.split('.').map(Number);

const posEquals = (p1: Position, p2: Position) => p1[0] === p2[0] && p1[1] === p2[1];

const blizzardChars = ['^', '>', 'v', '<'];

const input = Deno.readTextFileSync("./test.txt").split("\n");

const parse = (input: Array<string>): World => {
    const world: World = {
        walls: new Set(),
        blizzards: new Map(),
        entry: [0,0],
        exit: [0,0],
        player: [0,0],
        time: 0,
        width: input[0].length,
        height: input.length,
    };
    for (let l = 0; l < input.length; l++) {
        for (let c = 0; c < input.length; c++) {
            const char = input[l][c];
            const pos: Position = [l,c];
            if (char === '#') {
                world.walls.add(key(pos));
            }
            if (char === '.') {
                if (l === 0) { world.entry = pos; world.player = pos; };
                if (l === input.length - 1) world.exit = pos;
            }
            if (blizzardChars.includes(char)) {
                world.blizzards.set(key(pos), [char]);
            }
        }
    }
    return world;
};

const playerCanMoveTo = (world: World, position: Position) => {
    const notWall = !world.blizzards.has(key(position));
    const notBlizzard = !world.blizzards.has(key(position));
    return notWall && notBlizzard;
}

const moveBlizzard = (world: World, blizzard: string, position: Position) => {
    let bpos: Position = position;
    // move blizzard
    if (blizzard === '^') bpos = [bpos[0] -1, bpos[1]];
    if (blizzard === '>') bpos = [bpos[0], bpos[1] + 1];
    if (blizzard === 'v') bpos = [bpos[0] + 1, bpos[1]];
    if (blizzard === '<') bpos = [bpos[0], bpos[1] - 1];
    // if the new position is a wall move to the other side
    if (world.walls.has(key(bpos))) {
        if (blizzard === '^') bpos = [world.height - 2, bpos[1]];
        if (blizzard === '>') bpos = [bpos[0], 1];
        if (blizzard === 'v') bpos = [1, bpos[1]];
        if (blizzard === '<') bpos = [bpos[0], world.width - 2];
    }
    // merge with any existing blizzards
    const newBlizzards = (world.blizzards.get(key(bpos)) ?? []);
    newBlizzards.push(blizzard);
    world.blizzards.set(key(bpos), newBlizzards);
    // console.log(world.blizzards.get(key(bpos)), position, bpos);
    // remove old entry
    const oldBlizzards = world.blizzards.get(key(position));
    const oldIndex = oldBlizzards.findIndex(b => b === blizzard);
    oldBlizzards?.splice(oldIndex, 1);
    if (oldBlizzards?.length === 0) world.blizzards.delete(key(position));
    else world.blizzards.set(key(position), oldBlizzards);
    console.log(position, bpos, world.blizzards);
    return world;
}

const displayWorld = (world: World) => {
    let frame = '';
    for (let h = 0; h < world.height; h++) {
        let line = '';
        for (let w = 0; w < world.width; w++) {
            const blizzards = world.blizzards.get(key([h, w]));
            if (blizzards?.length) {
                line += blizzards.length === 1 ? blizzards[0] : blizzards.length;
                continue;
            }
            if (world.walls.has(key([h, w]))) {
                line+= '#';
                continue;
            }
            if (posEquals(world.player, [h, w])) {
                line+='E';
                continue;
            }
            if (posEquals(world.exit, [h, w])) {
                line+='X';
                continue;
            }
            line+='.';
        }
        frame += `${line}\n`;
    }
    return frame;
}

const loop = (world: World, count: number) => {
    for (let i = 0; i < count; i++) {
        world.blizzards.forEach((blizzards, k) => {

            console.log(world.blizzards.size)
            blizzards.forEach(b => moveBlizzard(world, b, toPos(k)));
        });
        world.time = world.time + 1;
    }
    return world;
}

const world = parse(input);

console.log(world);

console.log(displayWorld(world));

loop(world, 1);

console.log(world);

console.log(displayWorld(world));

// console.log(moved);
// console.log(displayWorld(loop(world, 2)));
