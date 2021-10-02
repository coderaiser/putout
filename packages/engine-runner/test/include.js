'use strict';

const test = require('supertape');
const putout = require('putout');
const tryCatch = require('try-catch');

const {runPlugins} = require('..');

test('putout: runner: include', (t) => {
    const include = {
        report: () => 'debugger found',
        fix: () => {},
        include: () => [
            'debugger',
        ],
    };
    
    const {places} = putout('debugger', {
        runPlugins,
        plugins: [{
            include,
        }],
    });
    
    const expected = [{
        message: 'debugger found',
        position: {
            column: 0,
            line: 1,
        },
        rule: 'include',
    }];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: runner: include: not a function', (t) => {
    const include = {
        report: () => 'debugger found',
        fix: () => {},
        include: [
            'debugger',
        ],
    };
    
    const [error] = tryCatch(putout, 'debugger', {
        runPlugins,
        plugins: [{
            include,
        }],
    });
    
    t.equal(error.message, '☝️ Looks like "include" is not a function: ["debugger"]. More on using Includer: https://git.io/JqcMn');
    t.end();
});

test('putout: runner: include: fix: options', (t) => {
    const include = {
        report: () => 'debugger found',
        fix: (path, {options}) => {
            const {value} = options;
            path.node.value = value;
        },
        include: () => [
            '"hello"',
        ],
    };
    
    const {code} = putout('"hello"', {
        runPlugins,
        rules: {
            include: ['on', {
                value: 'world',
            }],
        },
        plugins: [
            ['include', include],
        ],
    });
    
    t.equal(code, `'world';`);
    t.end();
});
