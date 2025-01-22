'use strict';

const {test} = require('supertape');
const {isKeyword} = require('./keyword');

test('putout: operator: keyword: isKeyword: yes', (t) => {
    const result = isKeyword('if');
    
    t.ok(result);
    t.end();
});

test('putout: operator: keyword: isKeyword: no', (t) => {
    const result = isKeyword('abc');
    
    t.notOk(result);
    t.end();
});
