'use strict';

const test = require('supertape');
const putout = require('putout');
const {runPlugins} = require('..');

test('putout: runner: plugins: traverse: store', (t) => {
    let result = [];
    
    const addVar = {
        report: () => '',
        traverse: ({store}) => ({
            'debugger'() {
                store('x');
            },
            Program: {
                exit() {
                    result = store();
                },
            },
        }),
    };
    
    putout('debugger', {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    putout('debugger', {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = [
        'x',
    ];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});
