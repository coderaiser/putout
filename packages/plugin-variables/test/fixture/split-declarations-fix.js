var a;
var b;

function xx() {
    let a = 5;
    let b = 6;
    
    return a + b;
}

for (let i = 0; i < 5; i++) {
    let a = 5;
    let b = 6;
    xx(a, b);
}

for (const s of j) {
    const a = 5;
    const b = 3;
    fn(a + b);
}

while (a > 3) {
    var d = 1;
    var b = 2;
    fn(d, b);
}

class Hello {
    m() {
        var a;
        var b;
        fn(a, b);
    }
}

fn(new Hello());
