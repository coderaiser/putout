const a = (b) => keys(b);

const b = (keys) => Object.keys(keys);

freeze(a);
defineProperty(b);
