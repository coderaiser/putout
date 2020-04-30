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
