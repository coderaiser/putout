test('message', (t) => {
    const copymitter = reRequire('..');
    const [error] = tryCatch(copymitter);
     
    t.equal(error.message, 'some error');
    t.end();
});
