async function promise() {
    const helloResult = await hello();
    return world(helloResult);
}
