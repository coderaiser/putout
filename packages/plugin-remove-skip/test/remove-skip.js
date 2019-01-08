'use strict';

const tryTo = require('try-to-tape');
//const test = tryTo(require('tape'));
const test = require('tape');
const putout = require('putout');

const removeSkip = require('..');
const {readFixtures} = require('./fixture');

const fixture = readFixtures([
    'skip',
    'skip-fix',
]);

test.skip('plugin-remove-skip', (t) => {
    const {code} = putout(fixture.skip, {
        plugins: [
            removeSkip,
        ]
    });
    const expected = fixture.skipFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

