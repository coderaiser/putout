'use strict';

const test = require('supertape');
const montag = require('montag');
const putout = require('putout');
const {print} = putout;

const {runPlugins} = require('..');

test('putout: runner: replace: same', (t) => {
    const addVar = {
        report: () => '',
        replace: () => ({
            'test(__a, (__args) => {})': 'test(__a, (__args) => {})',
        }),
    };
    
    const {code} = putout(`test('', (t) => {})`, {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = `test('', t => {});`;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: runner: replace: same path, new transform', (t) => {
    const convert = {
        report: () => '',
        replace: () => ({
            'module.exports.__a = __b': 'export const __a = __b',
        }),
    };
    
    const source = montag`
        module.exports.set = () => {
        };
        
        module.exports.get = () => {
        };
    `;
    
    const {code} = putout(source, {
        runPlugins,
        plugins: [
            ['convert', convert],
        ],
    });
    
    const expected = montag`
        export const set = () => {
        };
        
        export const get = () => {
        };
    `;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: runner: replace: recursive overflow', (t) => {
    const convert = {
        report: () => '',
        replace: () => ({
            test : 'test.only',
        }),
    };
    
    const source = [
        'test()',
    ].join('\n');
    
    const {code} = putout(source, {
        runPlugins,
        plugins: [
            ['convert', convert],
        ],
    });
    
    const expected = [
        'test.only()',
    ].join('\n');
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: runner: replace: __object', (t) => {
    const convert = {
        report: () => '',
        replace: () => ({
            __object: ({__object}) => {
                const code = print(__object);
                return `(${code})`;
            },
        }),
    };
    
    const source = montag`
        fn({a, b, c})
    `;
    
    const expected = montag`
        fn({
          a,
          b,
          c
        })
    `;
    
    const {code} = putout(source, {
        runPlugins,
        plugins: [
            ['convert', convert],
        ],
    });
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: runner: replace: return __object', (t) => {
    const convert = {
        report: () => '',
        replace: () => ({
            __object: ({__object}) => {
                return __object;
            },
        }),
    };
    
    const source = montag`
        fn({a, b, c})
    `;
    
    const {code} = putout(source, {
        runPlugins,
        plugins: [
            ['convert', convert],
        ],
    });
    
    t.deepEqual(code, source, 'should equal');
    t.end();
});

test.only('putout: runner: replace: literal', (t) => {
    const convert = {
        report: () => '',
        replace: () => ({
            '"__a" + __b': '`__a${__b}`',
        }),
    };
    
    const source = `const a = "hello " + world;`;
    const expected = 'const a = `hello ${world}`;';
    
    debugger;
    const {code} = putout(source, {
        runPlugins,
        plugins: [
            ['convert', convert],
        ],
    });
    
    t.deepEqual(code, source, 'should equal');
    t.end();
});

