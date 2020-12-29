module.exports = async function runTests(tests) {
    const total = tests.length;

    for (const {
        fn,
        message,
    } of tests) {
        await runOneTest({
            fn,
            message
        });
    }
}

async function runOneTest({
    message,
    fn
}) {
    formatter.emit('test', {
        message,
    });
    
    await tryToCatch(fn, t);
}

