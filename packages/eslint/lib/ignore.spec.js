'use strict';

const {test} = require('supertape');
const {isIgnored} = require('./ignore');

test('eslint: isIgnored: await', (t) => {
    const message = `Parsing error: Unexpected reserved word 'await'. (2:4)`;
    const result = isIgnored(message);
    
    t.ok(result);
    t.end();
});

test('eslint: isIgnored: yield', (t) => {
    const message = `Parsing error: Unexpected reserved word 'yield'`;
    const result = isIgnored(message);
    
    t.ok(result);
    t.end();
});
