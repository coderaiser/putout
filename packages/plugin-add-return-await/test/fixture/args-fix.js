async function runHello() {
    return await world(a, b, c);
}

async function runWorld() {
    return await runHello(a, b, c);
}
