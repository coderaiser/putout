'use strict';

const test = require('supertape');
const putout = require('putout');
const montag = require('montag');

const declare = require('../lib/declare.js');

test('putout: plugin: declare-undefined-variables: declare', (t) => {
    const declarations = {
        operator: `import {operator} from 'putout'`,
    };
    
    const {code} = putout('const {compare} = operator;', {
        plugins: [
            ['declare-undefined-variables', declare(declarations)],
        ],
    });
    
    const expected = montag`
        import {operator} from 'putout';
        const {compare} = operator;
    `;
    
    t.equal(code, expected);
    t.end();
});
