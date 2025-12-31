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
    let sorted_ranges = {
        let mut r = ranges.clone();
        r.sort_by_key(|&(start, _)| start);
        r
    };
    let merged_ranges: Vec<(u64, u64)> =
        sorted_ranges
            .iter()
            .copied()
            .fold(Vec::new(), |mut acc, (start, end)| {
                if let Some((_, last_end)) = acc.last_mut() {
                    if start <= *last_end {
                        *last_end = (*last_end).max(end);
                        return acc;
                    }
                }
                acc.push((start, end));
                acc
            });
    let result = merged_ranges
        .iter()
        .fold(0u64, |acc, (start, end)| acc + (end - start + 1));
    println!("{result:?}"); // 352807801032167
}
