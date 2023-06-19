function *gen() {
    if (Math.random() > 0.5) {
        yield 10;
    }
}

console.log([...gen()]);
