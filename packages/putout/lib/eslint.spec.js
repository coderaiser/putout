'use strict';

const test = require('supertape');
const stub = require('@cloudcmd/stub');

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

test('putout: eslint: loadPlugin: namespace', (t) => {
    const {_loadPlugin} = eslint;
    
    const require = stub();
    
    _loadPlugin('@babel/development', require);
    
    t.ok(require.calledWith('@babel/eslint-plugin-development'), 'should call require');
    t.end();
});

test('putout: eslint: loadPlugin', (t) => {
    const {_loadPlugin} = eslint;
    
    const require = stub();
    
    _loadPlugin('putout', require);
    
    t.ok(require.calledWith('eslint-plugin-putout'), 'should call require');
    t.end();
});
