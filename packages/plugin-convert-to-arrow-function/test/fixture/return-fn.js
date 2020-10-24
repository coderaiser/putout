function uncurrify(fn) {
    check(fn);

    return function(...args) {
        return reduce(args, (fn, arg) => {
            return fn(arg);
        }, fn);
    };
}
