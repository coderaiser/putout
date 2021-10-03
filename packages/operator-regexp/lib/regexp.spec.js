'use strict';

const {test} = require('supertape');
const {isSimpleRegExp} = require('./regexp.js');

test('putout: operator: regexp: is-simple-regexp', (t) => {
    const result = isSimpleRegExp(/hello world/);
    
    t.ok(result);
    t.end();
});

