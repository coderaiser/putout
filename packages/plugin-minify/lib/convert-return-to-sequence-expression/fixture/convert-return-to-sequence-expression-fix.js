() => (d(), 1);
() => (a(), b(), c(), a = 5 + 3, d(), 1);

() => {};
() => {
    if (a)
        return;
    
    return;
};

function x() {
    d();
    return 1;
}

if (a) {
    x();
    return 5;
}
