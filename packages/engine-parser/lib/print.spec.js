'use strict';

const test = require('supertape');
const montag = require('montag');

const putout = require('putout');

test('putout: parser: print: long lines', (t) => {
    const source = montag`
        test.only('putout: parseOptions: code mods directory: .putout: exclude node_modules', (t) => {
            const empty = {};
        });
    `;
    
    const expected = montag`
        test('putout: parseOptions: code mods directory: .putout: exclude node_modules', (t) => {
            const empty = {};
        });
    `;
    
    const {code} = putout(source, {
        plugins: [
            'remove-only',
        ],
    });
    
    t.equal(code, expected);
    t.end();
});

