'use strict';

const test = require('supertape');
const tryCatch = require('try-catch');

const parseRules = require('./parse-rules');

test('putout: loader: parse rules: not on/off', (t) => {
    const expected = 'hello: state option can be "on" or "off" only, when used as string, received: "abc"';
    const [error] = tryCatch(parseRules, {
        hello: 'abc',
    });
    
    t.equal(error.message, expected);
    t.end();
});

test('putout: loader: parse rules: two elements array', (t) => {
    const [error] = tryCatch(parseRules, {
        hello: ['on', {}],
    });
    
    t.notOk(error);
    t.end();
});

test('putout: loader: parse rules: disabled: enabled partially', (t) => {
    const result = parseRules({
        'convert-commonjs-to-esm': 'off',
        'convert-commonjs-to-esm/require': 'on',
    });
    
    const expected = [{
        msg: '',
        options: {},
        plugin: null,
        rule: 'convert-commonjs-to-esm',
        state: true,
    }, {
        msg: '',
        options: {},
        plugin: null,
        rule: 'convert-commonjs-to-esm/require',
        state: true,
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: loader: parse rules: three elements array: custom message', (t) => {
    const [, result] = tryCatch(parseRules, {
        hello: ['on', 'hello', {
            a: 'b',
        }],
    });
    
    const expected = [{
        rule: 'hello',
        state: true,
        plugin: null,
        msg: 'hello',
        options: {
            a: 'b',
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: loader: parse rules: not supported', (t) => {
    const [error] = tryCatch(parseRules, {
        hello: 1,
    });
    
    const expected = 'Rule format not supported 1: number';
    t.equal(error.message, expected);
    t.end();
});

test('putout: loader: parse rules: rules used instead of match', (t) => {
    const [error] = tryCatch(parseRules, {
        rules: {
            'README.md': {
                'remove-debugger': 'off',
            },
        },
    });
    
    const expected = 'Looks like you need to change "rules" to "match" for {"README.md":{"remove-debugger":"off"}}';
    
    t.equal(error.message, expected);
    t.end();
});

