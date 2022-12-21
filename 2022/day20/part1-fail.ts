type I = {
    l: I | undefined;
    r: I | undefined;
    pos: number;
    val: number;
}

class LinkedList {
    head: I;
    length: number;
    constructor(input: Array<number>) {
        this.length = input.length;
        this.head = { l: undefined, r: undefined, pos: 0, val: input[0] };
        let prevNode = this.head;
        for (let i = 1; i < input.length; i++) {
            const node  = { l: prevNode, r: undefined, pos: i, val: input[i] };
            prevNode.r = node;
            prevNode = node;
        }
        this.head.l = prevNode;
        prevNode.r = this.head;
    }
    print() {
        console.log('======= print');
        for(let i = 0, node: I = this.head; i < this.length; i++, node = node.r) {
            if (node && node.r) {
                console.log('val:', node.val, 'pos:', node.pos, 'l:', node.l?.val, 'r:', node.r?.val);
            }
            if (!node.l || !node.r) {
                console.error('Node does not have left or right!', node);
            }
        }
    }
    printNode(node: I) {
        console.log('print val:', node.val, 'pos:', node.pos, 'l:', node.l?.val, 'r:', node.r?.val);
    }

    find(val, pos) {
        for(let i = 0, node: I = this.head; i < this.length; i++, node = node.r) {
            if (node.val === val && node.pos === pos) return node;
        }
    }
    findVal(val) {
        for(let i = 0, node: I = this.head; i < this.length; i++, node = node.r) {
            if (node.val === val) return node;
        }
    }
    toArray() {
        const list = [];
        for(let i = 0, node: I = this.head; i < this.length; i++, node = node.r) {
            list.push(node.val);
        }
        return list;
    }
    move(val, pos) {
        const node = this.find(val, pos);
        let target = node;
        if (node) {
            const steps = node.val;
            if (steps !== 0) {
                if (steps > 0 ) for (let i = 0; i < steps; i++) target = target?.r;
                if (steps < 0 ) for (let i = 0; i < Math.abs(steps); i++) target = target?.l;
                // this.printNode(target);
                // snip
                node.l.r = node.r;
                node.r.l = node.l;
                if (node === this.head) {
                    this.head = node.r;
                }
                // if (target === this.head) {
                //     this.head = node;
                // }
                // insert
                if (steps > 0) {
                    // console.log('hi')
                    node.l = target;
                    node.r = target.r;
                    node.l.r = node;
                    node.r.l = node;
                    // move head
                } else {
                    // console.log('hi2')
                    // if (target === this.head) {
                    //     this.head = node;
                    // }
                    node.l = target.l;
                    node.r = target;
                    node.l.r = node;
                    node.r.l = node;
                }
            }
        }
        // this.print();
        return this;
    }
}

// Initial arrangement:        1, 2, -3, 3, -2, 0, 4
// 1 moves between 2 and -3:   2, 1, -3, 3, -2, 0, 4    f: 0 t: 1
// 2 moves between -3 and 3:   1, -3, 2, 3, -2, 0, 4    f: 0 t: 2
// -3 moves between -2 and 0:  1, 2, 3, -2, -3, 0, 4    f: 1 t: 4
// 3 moves between 0 and 4:    1, 2, -2, -3, 0, 3, 4    f: 2 t: 5
// -2 moves between 4 and 1:   1, 2, -3, 0, 3, 4, -2    f: 2 t: 6
// 0 does not move:            1, 2, -3, 0, 3, 4, -2    f: 3 t: 3
// 4 moves between -3 and 0:   1, 2, -3, 4, 0, 3, -2    f: 5 t: 3

const input = Deno.readTextFileSync("./input.txt").split("\n").map(Number);

// const input = [-1, 2, 3];

// const dll = new LinkedList(input);
// dll.print();

// dll.move(-1, 0)
// dll.move(-1, 0)
// dll.move(-1, 0)
// dll.move(-1, 0)
// dll.move(-1, 0)
// dll.move(1, 0)
// dll.move(1, 0)
// dll.move(1, 0)
// dll.move(2, 1)
// dll.move(-3, 2)
// dll.move(3, 3)
// dll.move(-2, 4)
// dll.move(0, 5)
// dll.move(4, 6)

// dll.print();

// const mix = (input, dll: I) => {
//     for (let i = 0; i < input.length; i++) {
//         // console.log('move ', input[i], i);
//         dll.move(input[i], i);
//     }
// }

// mix(input, dll);

// dll.print();

// const zero = dll.findVal(0);

// let node = zero;
// let total = 0;

// for (let i = 0; i < 1000; i++, node = node.r) {}
// total += node?.val; 
// for (let i = 0; i < 1000; i++, node = node.r) {} 
// total += node?.val; 
// for (let i = 0; i < 1000; i++, node = node.r) {} 
// total += node?.val; 

// console.log(total);

