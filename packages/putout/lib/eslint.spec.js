'use strict';

const test = require('supertape');
const eslint = require('./eslint');

test('putout: eslint: places', (t) => {
    const [, result] = eslint({
        name: 'hello.js',
        code: `const t = 'hi'`,
        fix: false,
    });
    
    const expected = [{
        rule: 'eslint/semi',
        message: 'Missing semicolon.',
        position: {
            line: 1,
            column: 15,
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: eslint: fix', (t) => {
    const [result] = eslint({
        name: 'hello.js',
        code: `const t = 'hi'`,
        fix: true,
    });
    
    const expected = `const t = 'hi';`;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: eslint: fix: same', (t) => {
    const [result] = eslint({
        name: 'hello.js',
        code: `const t = 'hi';`,
        fix: false,
    });
    
    const expected = `const t = 'hi';`;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: eslint: fix: cache', (t) => {
    const [result] = eslint({
        name: 'hello.js',
        code: `const t = 'hi'`,
        fix: true,
    });
    
    const expected = `const t = 'hi';`;
    
    t.deepEqual(result, expected);
    t.end();
});

