use std::fs;

const DIRECTIONS: [(isize, isize); 8] = [
    (-1, -1),
    (-1, 0),
    (-1, 1),
    (0, -1),
    (1, -1),
    (1, 0),
    (1, 1),
    (0, 1),
];

fn adjacent_paper(grid: &Vec<Vec<char>>, r: usize, c: usize) -> usize {
    let rows = grid.len() as isize;
    let cols = grid[0].len() as isize;
    DIRECTIONS
        .iter()
        .map(|&(dr, dc)| (r as isize + dr, c as isize + dc))
        .filter(|&(nr, nc)| nr >= 0 && nr < rows && nc >= 0 && nc < cols)
        .filter(|&(nr, nc)| grid[nr as usize][nc as usize] == '@')
        .count()
}

fn main() {
    let contents = fs::read_to_string("assets/day-04-input.txt").unwrap();
    let grid: Vec<Vec<char>> = contents
        .lines()
        .map(|line| line.trim().chars().collect())
        .collect();
    let result: usize = grid
        .iter()
        .enumerate()
        .flat_map(|(r, row)| row.iter().enumerate().map(move |(c, &ch)| (r, c, ch)))
        .filter(|&(r, c, ch)| ch == '@' && adjacent_paper(&grid, r, c) < 4)
        .count();
    println!("{result}"); // 1428
}
