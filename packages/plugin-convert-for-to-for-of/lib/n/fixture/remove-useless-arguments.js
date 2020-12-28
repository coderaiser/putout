module.exports = async function runTests(tests) {
    const total = tests.length;
    
    for (let index = 0; index < total; index++) {
        const {
            fn,
            message,
        } = tests[index];
        
        await runOneTest({
            fn,
            message,
            index,
        });
    }
}

async function runOneTest({message, fn, index}) {
    formatter.emit('test', {
        message,
    });
    
    await tryToCatch(fn, t);
}

