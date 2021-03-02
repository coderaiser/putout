const fn = (a) => {
    if (a) {
        await fn();
    }
}
