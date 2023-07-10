function a() {
    return new Promise((res, rej) => {
        return b().then(() => {
            res();
        });
    });
}
