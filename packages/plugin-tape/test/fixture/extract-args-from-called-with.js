t.calledWith(report, [
    coverage, {
        skipFull: false,
    },
]);

test('abc: def', (t) => {
    const args = [];
    
    t.calledWith(report, [
        coverage, {
            skipFull: false,
        },
    ]);
    t.end();
});

test('abc: def', (t) => {
    t.calledWith(executeFn, [
        ['tape', 'test.js'], {
            exit,
        },
    ]);
});


