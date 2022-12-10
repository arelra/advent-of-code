type position = [number, number];

const readMoves = (): Array<Array<string>> =>
  Deno.readTextFileSync("./input.txt").split("\n")
    .reduce((acc, l) => !!l ? acc.push(l.split(" ")) && acc : acc, []);

const isDetached = (head, tail) =>
  Math.abs(head[0] - tail[0]) > 1 || Math.abs(head[1] - tail[1]) > 1;
const distanceX = (head, tail) => head[0] - tail[0];
const distanceY = (head, tail) => head[1] - tail[1];

const moveHead = (move: string, p: position): position => {
  if (move === 'L') return [p[0] - 1, p[1]];
  if (move === 'R') return [p[0] + 1, p[1]];
  if (move === 'U') return [p[0], p[1] + 1];
  if (move === 'D') return [p[0], p[1] - 1];
  return p;
}

const moveTail = (head, tail) => {
  if (isDetached(head, tail)) {
    const dx = distanceX(head, tail);
    const dy = distanceY(head, tail);
    const addx = dx > 0 ? 1 : dx < 0 ? -1 : 0;
    const addy = dy > 0 ? 1 : dy < 0 ? -1 : 0;
    return [tail[0] + addx, tail[1] + addy]
  }
  return tail;
}

const playMoves = (moves) => {
  const visited: Array<string> = ['0.0'];
  let head: position = [0,0];
  let tail: position = [0,0];
  for (let i = 0; i < moves.length; i ++) {
    const [move, count] = moves[i];
    for (let m = 0; m < Number(count); m++) {
      head = moveHead(move, head);
      tail = moveTail(head, tail);
      visited.push(tail.join('.'));
    }
  }
  return visited;
}

console.log((new Set(playMoves(readMoves()))).size);