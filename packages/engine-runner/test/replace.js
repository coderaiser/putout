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
        fn(({
          a,
          b,
          c
        }))
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

test('putout: runner: replace: remove', (t) => {
    const rm = {
        report: () => '',
        replace: () => ({
            'for (__a of __array) __c': () => {
                return '';
            },
        }),
    };
    
    const {code} = putout('for (const a of []) {}', {
        runPlugins,
        plugins: [
            ['rm', rm],
        ],
    });
    
    const expected = '';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: runner: replace: remove', (t) => {
    const rm = {
        report: () => '',
        replace: () => ({
            'for (__a of __array) __c': () => {
                return '';
            },
        }),
    };
    
    const source = montag`
        // some loop
        for (const a of []) {}
    `;
    const {code} = putout(source, {
        runPlugins,
        plugins: [
            ['rm', rm],
        ],
    });
    
    const expected = montag`
        // some loop
    
    `;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: runner: replace: remove: no node', (t) => {
    const rm = {
        report: () => '',
        replace: () => ({
            'process.exit()': '',
            'process["exit"]()': '',
        }),
    };
    
    const {code} = putout('const a = 5;process.exit()', {
        runPlugins,
        plugins: [
            ['rm', rm],
        ],
    });
    
    const expected = 'const a = 5;';
    
    t.equal(code, expected, 'should equal');
    t.end();
});

test('putout: runner: replace: options', (t) => {
    const rm = {
        report: () => '',
        replace: ({options}) => ({
            'process.exit()': options.code,
        }),
    };
    
    const {code} = putout('const a = 5;process.exit()', {
        runPlugins,
        rules: {
            rm: ['on', {
                code: 'debugger',
            }],
        },
        plugins: [
            ['rm', rm],
        ],
    });
    
    const expected = 'const a = 5;debugger;';
    
    t.equal(code, expected, 'should equal');
    t.end();
});

