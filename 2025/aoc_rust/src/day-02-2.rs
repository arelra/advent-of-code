use std::fs;

fn loop_check(s: &str, pattern: &str, slen: usize, len_check: usize) -> bool {
    let matches = s.matches(pattern).count();
    matches * len_check == slen
}

fn main() {
    let input = fs::read_to_string("assets/day-02-input.txt").unwrap();
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
            if (slen > 1) {
                let evenlen = slen % 2 == 0;
                let middle = if evenlen { slen / 2 } else { (slen / 2) + 1 };
                let first_half = &s[0..middle];
                let second_half = &s[middle..slen];
                if first_half == second_half {
                    invalid += i;
                } else {
                    let mut len_check = first_half.len();
                    let mut pattern = &s[0..len_check];
                    while len_check > 0 {
                        if loop_check(&s, pattern, slen, len_check) {
                            invalid += i;
                            break;
                        }
                        len_check -= 1;
                        pattern = &s[0..len_check];
                    }
                }
            }
        }
    }
    println!("{}", invalid); // 69564213293
}
