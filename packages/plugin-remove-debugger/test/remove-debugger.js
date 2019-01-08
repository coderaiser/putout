'use strict';

const tryTo = require('try-to-tape');
const test = tryTo(require('tape'));
const putout = require('putout');

const removeDebugger = require('..');

test('remove debugger', (t) => {
    const {code} = putout('debugger', {
        plugins: [{
            'remove-debugger': removeDebugger,
        }]
    });
    const expected = '';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

