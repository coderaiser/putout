'use strict';

const test = require('supertape');
const {parseError} = require('./parse-error');

test('eslint-plugin-putout: putout: parse-error', (t) => {
    const message = `Cannot read properties of undefined (reading 'buildError')`;
    const result = parseError({message});
    const expected = 'Parser error';
    
    t.equal(result, expected);
    t.end();
});

test('eslint-plugin-putout: putout: parse-error: unexpected error', (t) => {
    const message = `Unexpected error`;
    const result = parseError({message});
    const expected = 'Unexpected error';
    
    t.equal(result, expected);
    t.end();
});

