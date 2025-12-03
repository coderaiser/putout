const f3 = ({}, two, {}) => two;

fs.realpath = (name, fn) => {
    fn();
};

f3({}, 2);
