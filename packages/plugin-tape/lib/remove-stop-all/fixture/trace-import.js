test('some: test', (t) => {
    const input = './fixture/trace.js';
    const stack = [];
    
    traceImport(input, {
        stack,
    });
    
    stopAll();
});

