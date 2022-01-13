test.skip('should pass', (t) => {
    t.pass('ok');
    t.end();
});

test['skip']('should pass', (t) => {
    t.pass('ok');
    t.end();
});

test[fn()]('should pass', (t) => {
    t.pass('ok');
    t.end();
});

