var a = (b) => keys(b), b = (keys) => Object.keys(keys);

freeze(a);
defineProperty(b);
