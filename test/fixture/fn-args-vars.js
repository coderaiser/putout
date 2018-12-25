const f1 = (one) => {};
const f2 = (one, two) => two;
const f3 = ({one}, two) => two;

f3({}, 2);

