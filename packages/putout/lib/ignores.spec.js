'use strict';

const test = require('supertape');

const ignores = require('./ignores');
const tryCatch = require('try-catch');

test('putout: ignores: empty path error', (t) => {
    const [e] = tryCatch(ignores, 'x/y', 'x/y', {ignore: ['*.js']});
    
    t.equal(e.message, 'path must not be empty');
    t.end();
});

test('putout: ignores: should be a `path.relative()` error', (t) => {
    const [e] = tryCatch(ignores, 'x/y/z', 'x/y', {ignore: ['*.js']});
    
    t.equal(e.message, 'path should be a `path.relative()`d string, but got ".."');
    t.end();
});

test('putout: ignores: the "from" argument must be of type string error', (t) => {
    const [e] = tryCatch(ignores);
    
    t.ok(e.message === 'The "from" argument must be of type string. Received type undefined' || e.message === 'Path must be a string. Received undefined');
    t.end();
});

test('putout: ignores: relative path', (t) => {
    const result = ignores('/x/y', '/x/y/z', {ignore: ['*.js']});
    const expected = false;
    
    t.equal(result, expected);
    t.end();
});

test('putout: ignores: empty string', (t) => {
    const result = ignores('', '');
    const expected = '';
    
    t.equal(result, expected);
    t.end();
});

test('putout: ignores: ignore true', (t) => {
    const result = ignores('x/y', 'x/y/z/*.js', {ignore: ['z/*.js']});
    const expected = true;
    
    t.equal(result, expected);
    t.end();
});
