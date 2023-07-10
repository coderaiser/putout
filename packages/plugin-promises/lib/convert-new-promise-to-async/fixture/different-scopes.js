function a() {
    return new Promise((resolve, reject) => {
        return b().then(() => {
            resolve();
        });
    });
}
