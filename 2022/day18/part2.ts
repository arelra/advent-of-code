type Point = [number, number, number];
type World = Record<string, Point>;

const input = Deno.readTextFileSync("./input.txt")
                .split("\n"
                ).map(l => l.split(',').map(Number));

const key = (p: Point): string =>
    `${p[0]}-${p[1]}-${p[2]}`;

const inputToWorld = (input) => {
    let [ minX, minY, minZ, maxX, maxY, maxZ ] = [ 1000, 1000, 1000, -1000, -1000, -1000 ];
    const world = input.reduce((acc, origin) => {
        acc[key(origin)] = origin;
        if (origin[0] < minX) minX = origin[0];
        if (origin[0] > maxX) maxX = origin[0];
        if (origin[1] < minY) minY = origin[1];
        if (origin[1] > maxY) maxY = origin[1];
        if (origin[2] < minZ) minZ = origin[2];
        if (origin[2] > maxZ) maxZ = origin[2];
        return acc;
    }, {});
    [ minX, minY, minZ, maxX, maxY, maxZ ] = [ minX - 1, minY - 1, minZ - 1, maxX + 1, maxY + 1, maxZ + 1];
    return { world, minX, minY, minZ, maxX, maxY, maxZ };
}

const { world, minX, minY, minZ, maxX, maxY, maxZ } = inputToWorld(input);

// const pointEquals = (p1: Point, p2: Point) =>
//     p1.every((p,i) => p === p2[i]);

const getNeighbours = (p: Point): Array<Point> => {
    const L: Point = [p[0] - 1, p[1]    , p[2]    ];
    const R: Point = [p[0] + 1, p[1]    , p[2]    ];
    const F: Point = [p[0]    , p[1]    , p[2] - 1];
    const B: Point = [p[0]    , p[1]    , p[2] + 1];
    const U: Point = [p[0]    , p[1] + 1, p[2]    ];
    const D: Point = [p[0]    , p[1] - 1, p[2]    ];
    return [L, R, F, B, U, D];
}

const faceCentre = (p: Point): Array<Point> => [
        [p[0] + 0.5, p[1] + 0.5, p[2]      ],   // F
        [p[0] + 0.5, p[1] + 0.5, p[2] + 1.0],   // B
        [p[0]      , p[1] + 0.5, p[2] + 0.5],   // L
        [p[0] + 1.0, p[1] + 0.5, p[2] + 0.5],   // R
        [p[0] + 0.5, p[1] + 1.0, p[2] + 0.5],   // U
        [p[0] + 0.5, p[1]      , p[2] + 0.5]];  // D

const isInBounds = (p: Point) =>
    p[0] >= minX && p[0] <= maxX && p[1] >= minY && p[1] <= maxY && p[2] >= minZ && p[2] <= maxZ;

const dfsAirVoxels = (world, start: Point) => {
    const visited: Record<string, Point> = { [key(start)]: start };
    const stack = [start];
    while (stack.length) {
        const voxel = stack.pop();
        const neighbours = (voxel && getNeighbours(voxel)) ?? [];
        for (let neighbour of neighbours) {
            if (!isInBounds(neighbour)) continue;
            if (world[key(neighbour)]) continue;
            if (visited[key(neighbour)]) continue;
            visited[key(neighbour)] = neighbour;
            stack.push(neighbour);
        }
    }
    return visited;
}

const airVoxels = dfsAirVoxels(world, [minX, minY, minZ]);

const countTouchingFaces = (world, air) => {
    const airFaces = {};
    const lavaFaces = {};
    let total = 0;
    for (let airVox in air)
        faceCentre(air[airVox]).forEach(f => airFaces[key(f)] = f);
    for (let lavaVox in world)
        faceCentre(world[lavaVox]).forEach(f => lavaFaces[key(f)] = f);
    for (let lavaFace in lavaFaces)
        if (airFaces[lavaFace]) total++;
    return total;
}

console.log(countTouchingFaces(world, airVoxels));