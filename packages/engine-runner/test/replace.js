'use strict';

const test = require('supertape');
const montag = require('montag');
const putout = require('putout');
const tryCatch = require('try-catch');

const {runPlugins} = require('..');

const {print, types} = putout;
const {StringLiteral} = types;

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
            test: 'test.only',
        }),
    };
    
    const source = montag`
        test()
    `;
    
    const {code} = putout(source, {
        runPlugins,
        plugins: [
            ['convert', convert],
        ],
    });
    
    const expected = montag`
        test.only()
    `;
    
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
            __object: ({__object}) => __object,
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
            'for (__a of __array) __c': () => '',
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

test('putout: runner: replace: remove: comments', (t) => {
    const rm = {
        report: () => '',
        replace: () => ({
            'for (__a of __array) __c': () => '',
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

test('putout: runner: replace: match: options', (t) => {
    const rm = {
        report: () => '',
        match: ({options}) => ({
            'process.exit()': () => options.is,
        }),
        replace: ({options}) => ({
            'process.exit()': options.code,
        }),
    };
    
    const {code} = putout('const a = 5;process.exit()', {
        runPlugins,
        rules: {
            rm: ['on', {
                code: 'debugger',
                is: true,
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

test('putout: runner: replace: same function: should produce same result', (t) => {
    const getValue = (a) => a.value;
    const push = (pattern) => {
        const fn = ({__a}, path) => {
            __a.elements.push(StringLiteral(pattern));
            return path;
        };
        
        return () => ({
            '__putout_processor_ignore(__a)': fn,
        });
    };
    
    const match = (pattern) => {
        const fn = ({__a}) => {
            const list = __a.elements.map(getValue);
            return !list.includes(pattern);
        };
        
        return () => ({
            '__putout_processor_ignore(__a)': fn,
        });
    };
    
    const hello = {
        report: () => '',
        match: match('hello'),
        replace: push('hello'),
    };
    const world = {
        report: () => '',
        match: match('world'),
        replace: push('world'),
    };
    
    const {code} = putout('__putout_processor_ignore([])', {
        runPlugins,
        plugins: [
            ['hello', hello],
            ['world', world],
        ],
    });
    
    const expected = `__putout_processor_ignore(['hello']);`;
    
    t.equal(code, expected, 'should equal');
    t.end();
});

test('putout: runner: replace: ts', (t) => {
    const hello = {
        report: () => 'Type "number" should be used instead of "any"',
        replace: () => ({
            'const __a: any = __b': ({__a}, path) => {
                __a.typeAnnotation.typeAnnotation.type = 'TSNumberKeyword';
                return path;
            },
        }),
    };
    
    const {code} = putout('const a: any = 5', {
        runPlugins,
        isTS: true,
        plugins: [
            ['hello', hello],
        ],
    });
    
    const expected = 'const a: number = 5';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: template identifiers not linked', (t) => {
    const hello = {
        report: () => '',
        replace: () => ({
            'const __a = 5': 'const __b = 7',
        }),
    };
    
    const message = '☝️ Looks like template values not linked: ["__b"] ["__a"]';
    
    const [error] = tryCatch(putout, 'const a = 5', {
        runPlugins,
        isTS: true,
        plugins: [
            ['hello', hello],
        ],
    });
    
    t.equal(error.message, message);
    t.end();
});

test('putout: runner: replace: template identifiers: instanceof', (t) => {
    const instance = {
        report: () => '',
        replace: () => ({
            '__a instanceof Array': 'Array.isArray(__a)',
        }),
    };
    
    const {code} = putout('[1, 2] instanceof Array', {
        runPlugins,
        plugins: [
            ['instance', instance],
        ],
    });
    
    const expected = 'Array.isArray([1, 2]);';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: import', (t) => {
    const instance = {
        report: () => '',
        replace: () => ({
            'import {parse, compare, transform} from "putout"': `{
                import {parse, transform} from 'putout';
                import compare from '@putout/compare';
            }`,
        }),
    };
    
    const source = montag`
        import {parse, compare, transform} from 'putout';
    `;
    
    const {code} = putout(source, {
        runPlugins,
        plugins: [
            ['instance', instance],
            'remove-nested-blocks',
        ],
    });
    
    const expected = montag`
        import {parse, transform} from 'putout';
        import compare from '@putout/compare';
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: empty', (t) => {
    const instance = {
        report: () => '',
        replace: () => ({
            '': '',
        }),
    };
    
    const source = montag`
        import {parse, compare, transform} from 'putout';
    `;
    
    const {code} = putout(source, {
        runPlugins,
        plugins: [
            ['instance', instance],
        ],
    });
    
    t.equal(code, source);
    t.end();
});

