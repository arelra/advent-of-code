use std::fs;

fn main() {
    let contents = fs::read_to_string("assets/day-05-input.txt").unwrap();
    let ranges: Vec<(u64, u64)> = contents
        .lines()
        .filter(|line| line.trim().contains("-"))
        .map(|line| {
            let (a, b) = line.split_once('-').expect("missing '-'");
            (
                a.parse().expect("invalid start"),
                b.parse().expect("invalid end"),
            )
        })
        .collect();
    let nums: Vec<u64> = contents
        .lines()
        .filter(|line| !line.trim().is_empty() && !line.contains("-"))
        .map(|line| line.parse().expect("invalid num"))
        .collect();
    let result: usize = nums
        .iter()
        .filter(|&&num| {
            ranges
                .iter()
                .any(|&(start, end)| num >= start && num <= end)
        })
        .collect::<Vec<_>>()
        .len();
    println!("{result:?}"); // 698
}
