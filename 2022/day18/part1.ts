type Point = [number, number, number];
type Cube = [Point, Point, Point, Point, Point, Point, Point, Point];
type SideKey = 'L' | 'R' | 'F' | 'B' | 'U' | 'D';
type Side = [Point, Point, Point, Point];

type CubeTouching = {
    origin: Point;
    cube: Cube;
    sides: Record<SideKey, { side: Side; touching: boolean; }>;
};

const input = Deno.readTextFileSync("./input.txt")
                .split("\n"
                ).map(l => l.split(',').map(Number));

const getPoints = (origin: Point): Cube => {
    const o: Point = [...origin];
    const p1: Point = o;
    const p2: Point = [o[0], o[1]+1, o[2]];
    const p3: Point = [o[0], o[1]+1, o[2]+1];
    const p4: Point = [o[0], o[1], o[2]+1];
    const p5: Point = [o[0]+1, o[1], o[2]];
    const p6: Point = [o[0]+1, o[1]+1, o[2]];
    const p7: Point = [o[0]+1, o[1]+1, o[2]+1];
    const p8: Point = [o[0]+1, o[1], o[2]+1];
    return [p1, p2, p3, p4, p5, p6, p7, p8];
}

const inputToCubes = (input: Array<Point>): Array<CubeTouching> => {
    const cubes = input.map(o => {
        const p: Cube = getPoints(o);
        return {
            origin: o,
            cube: p,
            sides: {
                'L' : { side: [p[0], p[1], p[2], p[3]], touching: false },
                'R' : { side: [p[4], p[5], p[6], p[7]], touching: false },
                'F' : { side: [p[0], p[1], p[5], p[4]], touching: false },
                'B' : { side: [p[3], p[2], p[6], p[7]], touching: false },
                'U' : { side: [p[1], p[2], p[6], p[5]], touching: false },
                'D' : { side: [p[0], p[3], p[7], p[4]], touching: false },
            }
        }});
    return cubes;
}

const sideIsTouching = (s1, s2) =>
    s1[0].every((p,i) => p === s2[0][i]) && s1[2].every((p,i) => p === s2[2][i]);

const markIfTouching = (c1: CubeTouching, c1side: SideKey, c2: CubeTouching, c2side: SideKey) => {
    const side1 = c1.sides[c1side].side;
    const side2 = c2.sides[c2side].side;
    const touching = side1[0].every((p,i) => p === side2[0][i]) && side1[2].every((p,i) => p === side2[2][i]);
    if (touching) {
        c1.sides[c1side].touching = true;
        c2.sides[c2side].touching = true;
    }
}

const checkSides = (cubes: Array<CubeTouching>) => {
    for (let c1 = 0; c1 < cubes.length; c1++) {
        const cube1 = cubes[c1];
        for (let c2 = 0; c2 < cubes.length; c2++) {
            const cube2 = cubes[c2];
            markIfTouching(cube1, 'L', cube2, 'R');
            markIfTouching(cube1, 'R', cube2, 'L');
            markIfTouching(cube1, 'F', cube2, 'B');
            markIfTouching(cube1, 'B', cube2, 'F');
            markIfTouching(cube1, 'U', cube2, 'D');
            markIfTouching(cube1, 'D', cube2, 'U');
        }
    }
    return cubes;
}

const countTouching = (cubes: Array<CubeTouching>) =>
    cubes.reduce((sum, cube) => {
        const sides = Object.values(cube.sides);
        const notTouching = sides.reduce((sum, s) => sum + (s.touching ? 0 : 1), 0);
        return sum + notTouching;
    }, 0);

console.log(countTouching(checkSides(inputToCubes(input))));
