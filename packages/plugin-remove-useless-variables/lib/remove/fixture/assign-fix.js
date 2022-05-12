// constant violation
let a = 5;
a = 3;
b[x] = a;

// no declaration
b[x] = b;

// references
let c = 5;
b[x] = c;
b[m] = c;

// not identifier
m = 5;

// nested member expression
const e = 5;
quasis[i + 1].node.value.raw  = e;

b[x] = 5;

