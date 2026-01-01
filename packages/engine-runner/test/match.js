import test from 'supertape';
import putout from 'putout';
import {tryCatch} from 'try-catch';
import {runPlugins} from '../lib/index.js';

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
    
    t.equal(error.rule, 'rm');
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
