'use strict';

const test = require('supertape');
const putout = require('putout');
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
