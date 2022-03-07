import tryCatch from 'try-catch';
test('message', (t) => {
    const [error] = tryCatch(copymitter, '/hello');

    t.equal(error.message, 'some error');
    t.end();
});
