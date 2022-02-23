async function hello() {
    if (a) {
        await tryToCatch(a, b);
    }
    
    const [x] = await tryToCatch();
}

