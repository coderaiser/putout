const now = new Date();
now.setDate(1);
let delta = 0;

const then = new Date();
then.setFullYear(then.getFullYear() + 1);

const first = now.getFullYear();
const second = then.getFullYear();

console.log(first + delta === second);
