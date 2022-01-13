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
        import {test} from 'supertape';
        test('putout: parseOptions: code mods directory: .putout: exclude node_modules', (t) => {
            const empty = {};
            t.end();
        });
    `;
    
    const {code} = putout(source, {
        plugins: [
            'tape',
        ],
    });
    
    t.equal(code, expected);
    t.end();
});

