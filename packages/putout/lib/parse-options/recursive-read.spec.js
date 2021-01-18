'use strict';

const {join} = require('path');

const test = require('supertape');
const mockRequire = require('mock-require');
const read = require('./recursive-read');

const {stopAll, reRequire} = mockRequire;

test('putout: parse-options: recursive read: dir', (t) => {
    const [dir] = read(__filename, '.putout.json');
    
    t.equal(dir, join(__dirname, '../..'));
    t.end();
});

test('putout: parse-options: called from eslint', (t) => {
    const [dir] = read('<input>', '.putout.json');
    
    t.notOk(dir);
    t.end();
});

test('putout: parse-options: windows', (t) => {
    // change to require('path/win32').on node v16
    const {win32} = require('path');
    
    mockRequire('path', win32);
    
    const read = reRequire('./recursive-read');
    const [dir] = read('c:\\windows\\', '.putout.json');
    stopAll();
    
    t.notOk(dir);
    t.end();
});

