var a, b;

function xx() {
    let a = 5,
        b = 6;
    
    return a + b;
}

for (let i = 0; i < 5; i++) {
    let a = 5,
        b = 6;
    
    xx(a, b);
}

for (const s of j) {
    const a = 5, b = 3;
    fn(a + b);
}

while(a > 3) {
    var d = 1, b = 2;
    fn(d, b);
}

class Hello {
    m() {
        var a, b;
        fn(a, b);
    }
}

fn(new Hello);
