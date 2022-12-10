import { assert } from "https://deno.land/std/testing/asserts.ts";

const isDetached = (head, tail) =>
  Math.abs(head[0] - tail[0]) > 1 || Math.abs(head[1] - tail[1]) > 1;
const distanceX = (head, tail) => head[0] - tail[0];
const distanceY = (head, tail) => head[1] - tail[1];

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

// start same position doesn't move
assert(moveTail([1,0], [0,0]).join('.') === '0.0');
assert(moveTail([0,0], [1,0]).join('.') === '1.0');
assert(moveTail([1,0], [0,0]).join('.') === '0.0');
assert(moveTail([0,0], [0,1]).join('.') === '0.1');
// adjacent does not move
assert(moveTail([1,1], [0,0]).join('.') === '0.0');
assert(moveTail([1,1], [0,0]).join('.') === '0.0');
assert(moveTail([1,1], [0,2]).join('.') === '0.2');
assert(moveTail([1,1], [0,2]).join('.') === '0.2');
assert(moveTail([1,1], [2,0]).join('.') === '2.0');
assert(moveTail([1,1], [2,0]).join('.') === '2.0');
assert(moveTail([1,1], [2,2]).join('.') === '2.2');
assert(moveTail([1,1], [2,2]).join('.') === '2.2');
// detached does move
assert(moveTail([2,1], [0,0]).join('.') === '1.1');
assert(moveTail([2,1], [0,2]).join('.') === '1.1');
assert(moveTail([2,1], [4,0]).join('.') === '3.1');
assert(moveTail([2,1], [4,2]).join('.') === '3.1');
