const c = (e) => e.w, w = (c) => c;

function f(e) {
    const {n} = e;
    
    e.w = n;
    const q = c(e);
    
    return q && w(q);
}

console.log(f({
    n: 1,
}));
