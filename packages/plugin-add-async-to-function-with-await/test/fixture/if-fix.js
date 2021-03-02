const fn = async a => {
    if (a) {
        await fn();
    }
}
