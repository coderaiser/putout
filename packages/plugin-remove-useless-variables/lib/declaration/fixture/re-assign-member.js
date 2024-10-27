const originalFetch = global.fetch;

global.fetch = stub().returns({
    headers: [
        ['content-type', 'image/png'],
    ],
});
const result = await _detectType('/hello');

global.fetch = originalFetch;

test('putout: cli: on halt: no isTTY', (t) => {
    const {isTTY} = process.stdin;
    
    process.stdin.isTTY = false;
    
    const onHalt = reRequire('./keypress');
    const {isHandlerSet} = onHalt();
    
    process.stdin.isTTY = isTTY;
    
    t.notOk(isHandlerSet(), 'should not set handler');
    t.end();
});
