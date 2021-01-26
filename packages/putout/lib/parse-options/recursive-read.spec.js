'use strict';

const {join} = require('path');

const {stub, test} = require('supertape');
const mockRequire = require('mock-require');
const tryCatch = require('try-catch');

const read = require('./recursive-read');

const {stopAll, reRequire} = mockRequire;

test('putout: parse-options: recursive read: dir', (t) => {
    const [dir] = read(__filename, '.putout.json');
    
    t.equal(dir, join(__dirname, '../..'));
    t.end();
});

test('putout: parse-options: recursive read: called from eslint', (t) => {
    const [dir] = read('<input>', '.putout.json');
    
    t.notOk(dir);
    t.end();
});

test('putout: parse-options: recursive read: windows', (t) => {
    // change to require('path/win32').on node v16
    const {win32} = require('path');
    
    mockRequire('path', win32);
    
    const read = reRequire('./recursive-read');
    const [dir] = read('c:\\windows\\', '.putout.json');
    stopAll();
    
    t.notOk(dir);
    t.end();
});

test('putout: parse-options: recursive read: error', (t) => {
    const error = Error('hello');
    const require = stub().throws(error);
    
    const [resultError] = tryCatch(read, __filename, '.putout.json', {
        require,
    });
    
    t.equal(resultError, error);
    t.end();
});

test('putout: parse-options: recursive read: error: no error', (t) => {
    const require = stub();
    
    const [, options] = tryCatch(read, __filename, '.putout.json', {
        require,
    });
    
    t.equal(typeof options, 'object', 'options should be and object when no error');
    t.end();
});
