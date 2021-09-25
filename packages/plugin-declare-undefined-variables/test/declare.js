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

test('putout: plugin: declare-undefined-variables: declare: variable', (t) => {
    const declarations = {
        operator: `import {operator} from 'putout'`,
        getTemplateValues: `const {getTemplateValues} = operator`,
    };
    
    const source = montag`
        module.exports.traverse = () => ({
            'const __a = __b': (path) => {
                const {__a} = getTemplateValues(path, 'const __a = __b');
            },
        });
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['declare-undefined-variables', declare(declarations)],
        ],
    });
    
    const expected = montag`
        import {operator} from 'putout';
        
        const {
            getTemplateValues
        } = operator;
        
        module.exports.traverse = () => ({
            'const __a = __b': (path) => {
                const {__a} = getTemplateValues(path, 'const __a = __b');
            },
        });
    `;
    
    t.equal(code, expected);
    t.end();
});
