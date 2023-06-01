const y = 'abc';
const x = y;
const fn = require(x);

const a = 5;
const b = a;
const c = b;

fn(c);

const aaa = (m, c) => {
    const x = m;
    console.log(x, m, c);
};
