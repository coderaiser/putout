await fn();

function fn() {
    return new Promise((resolve) => {
        resolve('x');
    });
}

