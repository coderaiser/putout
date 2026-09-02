const fn = (a) => a();
const [e] = tryCatch(fn, 'a');
