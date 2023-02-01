let a = 0;
const fn = currify(() => list.forEach((b) => a += b));

const fn2 = currify(() => list.forEach((b, i) => a += i));

