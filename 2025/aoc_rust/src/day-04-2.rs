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

fn adjacent_paper(grid: &mut Vec<Vec<char>>, r: usize, c: usize) -> usize {
    let rows = grid.len() as isize;
    let cols = grid[0].len() as isize;
    DIRECTIONS
        .iter()
        .map(|&(dr, dc)| (r as isize + dr, c as isize + dc))
        .filter(|&(nr, nc)| nr >= 0 && nr < rows && nc >= 0 && nc < cols)
        .filter(|&(nr, nc)| grid[nr as usize][nc as usize] == '@')
        .count()
}

fn remove_paper(grid: &mut Vec<Vec<char>>) -> i32 {
    let mut result = 0;
    for r in 0..grid.len() {
        for c in 0..grid[r].len() {
            let is_paper = grid[r][c] == '@';
            let can_access = adjacent_paper(grid, r, c);
            if is_paper && can_access < 4 {
                grid[r][c] = 'x';
                result += 1;
            }
        }
    }
    return result;
}

fn main() {
    let contents = fs::read_to_string("assets/day-04-input.txt").unwrap();
    let mut grid: Vec<Vec<char>> = contents
        .lines()
        .map(|line| line.trim().chars().collect())
        .collect();
    let mut result = 0;
    // :]
    while let removed_papers @ 1.. = remove_paper(&mut grid) {
        result += removed_papers;
    }
    println!("{result}"); // 8936
}
