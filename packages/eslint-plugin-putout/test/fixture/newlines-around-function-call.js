test('hello', () => {
    const message = 'hello world';
    
    reRequire('./validator');
    const supertape = reRequire('..');
    supertape(message, fn1, {
        quiet: true,
        checkDuplicates: false,
    });
    
    supertape(message, fn1, {
        quiet: true,
        checkDuplicates: false,
    });
});

