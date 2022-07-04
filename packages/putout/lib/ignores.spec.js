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
    
    t.ok(e, 'should be an error');
    t.end();
});

test('putout: ignores: relative path', (t) => {
    const result = ignores('/x/y', '/x/y/z', {ignore: ['*.js']});
    
    t.notOk(result);
    t.end();
});

test('putout: ignores: empty string', (t) => {
    const result = ignores('', '');
    const expected = '';
    
    t.equal(result, expected);
    t.end();
});

test('putout: ignores: ignore true', (t) => {
    const result = ignores('x/y', 'x/y/z/*.js', {
        ignore: ['z/*.js'],
    });
    
    t.ok(result);
    t.end();
});

test('putout: ignores: negative', (t) => {
    const result = ignores('/', '/fixture', {
        ignore: ['!fixture', 'fixture'],
    });
    
    t.notOk(result);
    t.end();
});

