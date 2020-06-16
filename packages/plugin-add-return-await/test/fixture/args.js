async function runHello() {
    return await world(a, b, c);
}

async function runWorld() {
    return runHello(a, b, c);
}
