async function runHello() {
    return await world();
}

async function runWorld() {
    return runHello();
}
