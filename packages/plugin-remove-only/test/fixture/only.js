test.only('should pass', (t) => {
    t.pass('ok');
    t.end();
});

test['only']('should pass', (t) => {
    t.pass('ok');
    t.end();
});

test[fn()]('should pass', (t) => {
    t.pass('ok');
    t.end();
});

