'use strict';

const {join} = require('path');

const test = require('supertape');
const read = require('./recursive-read');

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
