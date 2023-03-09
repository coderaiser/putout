'use strict';

const {test} = require('supertape');
const montag = require('montag');
const tryCatch = require('try-catch');
const putout = require('putout');

test('engine-runner: declare', (t) => {
    const {code} = putout(`isString('hello')`, {
        plugins: [
            ['declare', {
                declare: () => ({
                    isString: `const isString = (a) => typeof a === 'string'`,
                }),
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

test('engine-runner: declare: not fn', (t) => {
    const [error] = tryCatch(putout, `isString('hello')`, {
        plugins: [
            ['declare', {
                declare: {},
            }],
        ],
    });
    
    const expected = Error(`☝️ Looks like 'declare' property value is not a 'function', but 'object' with value '{}'.`);
    
    t.deepEqual(error, expected);
    t.end();
});

