const obj = {
    a: 1,
};

log({
    set,
    ...obj,
});

function log({set, a}) {
    set(a);
}
