const mockRequire = require('mock-require');

const {reRequire, stopAll} = mockRequire;

test('', (t) => {
    mockRequire('fs/promises', {
        unlink: stub(),
    });
    
    const fn = reRequire('..');
    fn();
    
    stopAll();
    t.end();
});

test('', (t) => {
    mockRequire('fs/promises', {
        unlink: stub(),
    });
    
    const fn = reRequire('..');
    fn();
    
    stopAll();
    t.end();
});
