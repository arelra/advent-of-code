const input = await Deno.readTextFile("./input.txt");

const scores = { A: 1, B: 2, C: 3 };
const strategy = { X: 'A', Y: 'B', Z: 'C'};

const game = (them: string, me: string) => {
    const myPlay = strategy[me];
    const myScore = scores[myPlay];
    if (them === myPlay) return 3 + myScore;
    switch (them) {
        case 'A': {
            if (myPlay === 'C') return myScore;
            if (myPlay === 'B') return 6 + myScore;
            break;
        }
        case 'B': {
            if (myPlay === 'A') return myScore;
            if (myPlay === 'C') return 6 + myScore;
            break;
        }
        case 'C': {
            if (myPlay === 'A') return 6 + myScore;
            if (myPlay === 'B') return myScore;
            break;
        }
    }
};

const result = input.split('\n').reduce((sum, round) => {
    const [them , me] = round.split(" ");
    const score = game(them, me);
    return sum + (score ?? 0);
}, 0);

console.log(result);