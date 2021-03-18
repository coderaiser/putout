async function throwError() {
    return await Promise.reject(Error('hello'));
}

