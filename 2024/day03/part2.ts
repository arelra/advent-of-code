console.log(
  [
    ...(await Deno.readTextFile("./input.txt")).matchAll(
      /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g
    ),
  ].reduce(
    ({ sum, doo }, match) => ({
      sum:
        match[0][0] !== "d" && doo
          ? sum + parseInt(match[1]) * parseInt(match[2])
          : sum,
      doo: match[0] === "do()" ? true : match[0] === "don't()" ? false : doo,
    }),
    { sum: 0, doo: true }
  ).sum
); // 76911921
