'use strict';

const tryTo = require('try-to-tape');
const test = tryTo(require('tape'));
const putout = require('putout');

const removeSkip = require('..');
const {readFixtures} = require('./fixture');

const fixture = readFixtures([
    'skip',
    'skip-fix',
]);

test('plugin-remove-skip', (t) => {
    const {code} = putout(fixture.skip, {
        plugins: [{
            'remove-skip': removeSkip,
        }]
    });
    const expected = fixture.skipFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

