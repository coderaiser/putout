function a() {
    return x.stub(() => Promise.resolve({
        hello: 'world',
    }))
}