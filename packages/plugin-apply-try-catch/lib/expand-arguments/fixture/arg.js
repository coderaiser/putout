const fn = (a) => JSON.stringify(a);
const [, data] = tryCatch(fn, {a: 'b'});
