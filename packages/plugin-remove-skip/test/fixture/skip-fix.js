test('should pass', (t) => {
    t.pass('ok');
    t.end();
});

test('should pass', (t) => {
    t.pass('ok');
    t.end();
});

test.skip.skip('should pass', (t) => {
    t.pass('ok');
    t.end();
});

test[fn()]('should pass', (t) => {
    t.pass('ok');
    t.end();
});

