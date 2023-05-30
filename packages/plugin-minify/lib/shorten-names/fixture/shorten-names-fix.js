const a = (b) => {
    keys(b);
};

const b = (keys) => {
    keys(keys);
};

freeze(a);
defineProperty(b);
