function uncurrify(fn) {
    check(fn);
    
    return (...args) => {
        return reduce(args, (fn, arg) => {
            return fn(arg);
        }, fn);
    };
}
