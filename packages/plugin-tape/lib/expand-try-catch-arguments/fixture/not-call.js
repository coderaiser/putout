test('message', (t) => {
    const fn = () => {
        copymitter('/hello');
    };
    
    const [error] = tryCatch(fn);
     
    t.equal(error.message, 'some error');
    t.end();
});
