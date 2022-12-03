const input = await Deno.readTextFile("./input.txt");

const scores = { A: 1, B: 2, C: 3 };
const strategy = { X: 'lose', Y: 'draw', Z: 'win'};
const strategies = {
    A: { win: 'B', lose: 'C', draw: 'A'},
    B: { win: 'C', lose: 'A', draw: 'B'},
    C: { win: 'A', lose: 'B', draw: 'C'},
};

const game = (them: string, me: string) => {
    const myStrategy = strategy[me];
    const myScore = scores[strategies[them][myStrategy]];
    if (myStrategy === 'draw') return 3 + myScore;
    if (myStrategy === 'win') return 6 + myScore;
    return myScore;
};

const result = input.split('\n').reduce((sum, round) => {
    const [them , me] = round.split(" ");
    const score = them ? game(them, me) : 0;
    return sum + score;
}, 0);

console.log(result);