use std::fs;

fn find_max(line_with_pos: &Vec<(usize, char)>, from: usize, to: usize) -> Option<&(usize, char)> {
    line_with_pos[from..to]
        .iter()
        .rev()
        // get the first max not the last as per normal max_by_key
        .max_by_key(|(_, c)| c.to_digit(10).unwrap())
}

fn main() {
    let contents = fs::read_to_string("assets/day-03-input.txt").unwrap();
    let mut acc = 0;
    for line in contents.lines() {
        let line_with_pos: Vec<(usize, char)> = line.trim().chars().enumerate().collect();
        if let Some(&(high_pos, high_num)) = find_max(&line_with_pos, 0, line.len() - 1) {
            if let Some(&(_, next_high_num)) = find_max(&line_with_pos, high_pos + 1, line.len()) {
                let result = format!("{}{}", high_num, next_high_num);
                acc += result.parse::<i64>().expect("failed to parse");
            }
        }
    }
    println!("{}", acc); // 17263
}
