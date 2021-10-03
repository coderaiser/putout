'use strict';

const {test} = require('supertape');
const isSimpleRegExp = require('./is-simple-regexp');

test('putout: operator: regexp: is-simple-regexp: simple regexp', (t) => {
    const result = isSimpleRegExp(/hello world/);
    
    t.ok(result);
    t.end();
});
test('putout: operator: regexp: is-simple-regexp: not simple regexp', (t) => {
    const result = isSimpleRegExp(/[a-z]/);
    
    t.notOk(result);
    t.end();
});

