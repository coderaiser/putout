'use strict';

const test = require('supertape');
const putout = require('putout');

const {readFixtures} = require('../../test/fixture');

const fixture = readFixtures(__dirname, ['hermes', 'hermes-fix']);

test('putout: parser: hermes', (t) => {
    const {code} = putout(fixture.hermes, {
        parser: 'hermes',
        plugins: ['remove-unused-variables'],
    });
    
    const expected = fixture.hermesFix;
    
    t.deepEqual(code, expected);
    t.end();
});
