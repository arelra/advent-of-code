const lines = Deno.readTextFileSync("./input.txt")
  .split("\n")
  .map((line) => line.split(": "))
  .map(([total, n]) => [Number(total), n.split(" ").map(Number)]);

const trySum = (
  total: number,
  nums: number[],
  i: number = 0,
  sum: number = 0
): number => {
  if (sum > total) return 0;
  if (i === nums.length) return sum === total ? total : 0;
  return (
    trySum(total, nums, i + 1, sum + nums[i]) ||
    trySum(total, nums, i + 1, sum * nums[i])
  );
};

console.log(lines.reduce((acc, [total, nums]) => acc + trySum(total, nums), 0)); // 7579994664753
