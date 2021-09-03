'use strict';

const test = require('supertape');
const putout = require('putout');
const tryCatch = require('try-catch');

const {runPlugins} = require('..');

test('putout: runner: match', (t) => {
    const rm = {
        report: () => '',
        match: () => ({
            'const __array = __': () => {
                throw Error('hello');
            },
        }),
        replace: () => ({
            'const __array = __x': '',
        }),
    };
    
    const [error] = tryCatch(putout, 'const [] = array', {
        runPlugins,
        plugins: [{
            rm,
        }],
    });
    
    t.deepEqual(error.rule, 'rm');
    t.end();
});

test('putout: runner: match: avoid move top while compare', (t) => {
    const types = [];
    const rm = {
        report: () => '',
        match: () => ({
            'const __a = require(__b)': (vars, path) => {
                types.push(path.type);
            },
            'require(__a)': () => false,
        }),
        replace: () => ({
            'const __a = require(__b)': '',
            'require(__a)': 'import(__a)',
        }),
    };
    
    putout('const a = require("hello")', {
        fixCount: 2,
        runPlugins,
        plugins: [{
            rm,
        }],
    });
    
    const expected = [
        'VariableDeclaration',
    ];
    
    t.deepEqual(types, expected);
    t.end();
});

