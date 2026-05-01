test('readFileSync: should throw when no file', (t) => {
    let fn = () => docker.readFileSync('hello', 'world');
    const [error] = tryCatch(fn);
    
    t.equal(error.message, 'Error: ENOENT: no such file or directory, open \'hello\/world\.pem\'', 'should throw when no such file');
    t.end();
});
