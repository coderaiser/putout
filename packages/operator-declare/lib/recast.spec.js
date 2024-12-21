'use strict';

const test = require('supertape');
const putout = require('putout');
const montag = require('montag');

const {declare} = require('./declare.js');

test('putout: operator: declare: recast: strict mode', (t) => {
    const declarations = {
        test: `import {test} from 'supertape'`,
        stub: `import {stub} from 'supertape'`,
    };
    
    const source = montag`
        'use strict';
        
        test('', (t) => {
            const fn = stub();
            fn();
            t.end();
        });\n
    `;
    
    const {code: secondAttempt} = putout(source, {
        printer: 'recast',
        plugins: [
            'esm',
            'strict-mode',
            ['declare', declare(declarations)],
        ],
    });
    
    const expected = montag`
        import {test, stub} from 'supertape';
        
        test('', (t) => {
            const fn = stub();
            fn();
            t.end();
        });\n
    `;
    
    t.equal(secondAttempt, expected);
    t.end();
});
