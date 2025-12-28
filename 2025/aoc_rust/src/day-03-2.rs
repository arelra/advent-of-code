use std::fs;

fn find_max(
    i: usize,
    line_with_pos: &Vec<(usize, char)>,
    from: usize,
    digits: usize,
) -> Option<&(usize, char)> {
    line_with_pos[from..(line_with_pos.len() - digits + i)]
        .iter()
        .rev()
        // get the first max not the last as per normal max_by_key
        .max_by_key(|(_, c)| c.to_digit(10).unwrap())
}

fn main() {
    let contents = fs::read_to_string("assets/day-03-input.txt").unwrap();
    let digits = 12;
    let mut acc = 0;
    for line in contents.lines() {
        let line_with_pos: Vec<(usize, char)> = line.trim().chars().enumerate().collect();
        let mut from_pos = 0;
        let mut result = String::new();
        for i in 1..=digits {
            let max_pos = find_max(i, &line_with_pos, from_pos, digits);
            result.push_str((max_pos).unwrap().1.to_string().as_str());
            from_pos = (max_pos).unwrap().0 + 1;
        }
        acc += result.parse::<i64>().expect("failed to parse");
    }
    println!("{}", acc); // 170731717900423
}
