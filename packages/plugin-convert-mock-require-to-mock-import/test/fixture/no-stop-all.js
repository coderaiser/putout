const mockRequire = require('mock-require');

const {reRequire} = mockRequire;

test('', (t) => {
    mockRequire('fs/promises', {
        unlink: stub(),
    });
    
    const fn = reRequire('..');
    fn();
    
    t.end();
});

