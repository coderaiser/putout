const q = 1, b = {};

function c(e, n) {
    return assign({}, b, n);
}

let d = c(!q);
console.log(d[q] && d);
