'use strict';

const tryTo = require('try-to-tape');
const test = tryTo(require('tape'));
const putout = require('putout');

const rmProcessExit = require('..');
const {readFixtures} = require('./fixture');

const fixture = readFixtures([
    'process-exit',
    'process-exit-fix',
]);

test('rm-process.exit', (t) => {
    const {code} = putout(fixture.processExit, {
        plugins: [{
            'remove-process-exit': rmProcessExit,
        }]
    });
    const expected = fixture.processExitFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

