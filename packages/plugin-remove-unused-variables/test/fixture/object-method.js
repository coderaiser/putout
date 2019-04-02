new Proxy({}, {
    get(target, property) {
        console.log(property);
    }
});

