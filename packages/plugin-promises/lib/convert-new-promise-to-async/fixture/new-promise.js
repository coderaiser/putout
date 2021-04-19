function get() {
    return new Promise((resolve, reject) => {
        if (a > b)
            return resolve('hello');

        reject(Error("Cannot get"));
    });
}

