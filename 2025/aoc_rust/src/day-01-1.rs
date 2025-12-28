use std::fs;

fn main() {
    let mut dial: i32 = 50;
    let mut count: i32 = 0;
    let contents = fs::read_to_string("assets/day-01-input.txt").unwrap();
    for line in contents.lines() {
        let (dir, steps) = (&line[0..1], line[1..].parse::<i32>().unwrap());
        dial += steps * if dir == "L" { -1 } else { 1 };
        let modval = (dial).rem_euclid(100);
        count += if modval == 0 { 1 } else { 0 };
        dial = modval;
    }
    println!("Count: {count}, Final Dial: {dial}"); // 1120
}
