use std::fs;

fn main() {
    let input = fs::read_to_string("assets/day-02-input.txt").unwrap();
    // let parts: Vec<&str> = input.split(',').collect();
    let parts: Vec<[i64; 2]> = input
        .split(',')
        .map(|s| {
            let (a, b) = s.split_once('-').expect("missing '-'");
            let a: i64 = a.parse().expect("invalid int");
            let b: i64 = b.parse().expect("invalid int");
            [a, b]
        })
        .collect();

    let mut invalid: i64 = 0;
    for part in &parts {
        for i in part[0]..=part[1] {
            let s = i.to_string();
            let slen = s.len();
            let evenlen = slen % 2 == 0;
            let middle = if evenlen { slen / 2 } else { (slen / 2) + 1 };
            let first_half = &s[0..middle];
            let second_half = &s[middle..slen];
            if first_half == second_half {
                invalid += i;
                // println!("i: {}, fh: {}, sh: {}", i, first_half, second_half);
            }
        }
    }
    println!("{}", invalid); // 52316131093
}
