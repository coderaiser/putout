'use strict';

const {join} = require('path');

const {stub, test} = require('supertape');
const tryCatch = require('try-catch');

const read = require('./recursive-read');

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
    const require = stub().returns({
        hello: 'world',
    });
    
    const [, options] = read(__filename, '.putout.json', {
        require,
    });
    
    const expected = {
        hello: 'world',
    };
    
    t.deepEqual(options, expected);
    t.end();
});

