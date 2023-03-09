'use strict';

const montag = require('montag');
const {test} = require('supertape');
const putout = require('putout');

test('engine-runner: declare', (t) => {
    const {code} = putout(`isString('hello')`, {
        plugins: [
            ['declare', {
                declare: {
                    isString: `const isString = (a) => typeof a === 'string'`,
                },
            }],
        ],
    });
    
    const expected = montag`
        const isString = a => typeof a === 'string';
        isString('hello')
    `;
    
    t.equal(code, expected);
    t.end();
});

