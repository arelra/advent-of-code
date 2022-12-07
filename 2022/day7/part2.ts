type Directory = {
  name: string;
  parent: Directory | undefined;
  files: Array<{ name: string; size: number }>;
  directories: Array<Directory>;
};

const parse = (root: Directory | undefined) =>
  Deno.readTextFileSync("./input.txt").split("\n").reduce((node, line, i) => {
    const [col1, col2, col3] = line.split(" ");
    if (col1 === "$" && col2 === "cd") {
      if (col3 === "/") return root;
      if (col3 === "..") return node?.parent;
      return node?.directories.find((d) => d.name === col3) ?? node;
    }
    if (col1 === "dir")
      node?.directories.push({ name: col2, parent: node, files: [], directories: []});
    if (!Number.isNaN(Number(col1)) && line)
      node?.files.push({ name: col2, size: Number(col1) });
    return node;
  }, root) && root;

const sumDirs = (node: Directory, answer) => {
    const fileSizes = node.files.reduce((sum, f) => sum + f.size, 0);
    const dirSizes = node.directories.reduce((sum, d) => sum + sumDirs(d, answer)[0], fileSizes);
    answer.push({ name: node.name, size: dirSizes });
    return [dirSizes, answer];
}

const root = parse({ name: "/", parent: undefined, files: [], directories: [] });
const dirs = sumDirs(root, [])[1].sort((a,b) => a.size - b.size);
const total = dirs[dirs.length - 1].size;
const sizeRequired = 30000000 - (70000000 - total);
console.log(dirs.find(d => d.size >= sizeRequired));
