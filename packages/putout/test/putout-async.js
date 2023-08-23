'use strict';

const test = require('supertape');
const {putoutAsync} = require('..');

test('putout: async', async (t) => {
    const source = 'for (const a of b.entries()) {}';
    const {code} = await putoutAsync(source, {
        plugins: [
            'apply-entries',
        ],
    });
    
    const expected = 'for (const a of entries(b)) {}\n';
    
    t.equal(code, expected);
    t.end();
});
