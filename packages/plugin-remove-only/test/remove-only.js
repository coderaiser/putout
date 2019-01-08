'use strict';

const tryTo = require('try-to-tape');
const test = tryTo(require('tape'));
const putout = require('putout');

const removeOnly = require('..');
const {readFixtures} = require('./fixture');

const fixture = readFixtures([
    'only',
    'only-fix',
]);

test('plugin-remove-only', (t) => {
    const {code} = putout(fixture.only, {
        plugins: [{
            'remove-only': removeOnly,
        }]
    });
    const expected = fixture.onlyFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

