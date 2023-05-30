var a = (b) => keys(b);

var b = (keys) => Object.keys(keys);

freeze(a);
defineProperty(b);
