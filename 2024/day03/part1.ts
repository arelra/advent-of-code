console.log(
  [
    ...(await Deno.readTextFile("./input.txt")).matchAll(
      /mul\(([\d]{1,3}),([\d]{1,3})\)/g
    ),
  ].reduce((sum, match) => (sum += parseInt(match[1]) * parseInt(match[2])), 0)
); // 163931492
