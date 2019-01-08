const f1 = (a, b) => {};
const f2 = (one, two) => two;
const f3 = ({one}, two, {hi}) => two;

fs.realpath = (name, fn) => {
    fn();
};

f3({}, 2);

