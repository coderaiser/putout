'use strict';

const test = require('supertape');
const putout = require('putout');

const {compare} = require('./compare');
const {getTemplateValues} = require('./vars');

test('putout: compare: getTemplateValues', (t) => {
    const addVar = {
        report: () => '',
        filter: (path) => {
            const {node} = path;
            const {body} = node;
            const [first] = body.body;
            const {__i} = getTemplateValues(node, 'for (let __i = 0; __i < __n; __i++) __c');
            
            return compare(first, `const __a = __b[${__i.name}]`);
        },
        replace: () => ({
            'for (let __i = 0; __i < __n; __i++) __c': (vars) => {
                const {__c, __i} = vars;
                const [node] = __c.body;
                const {__a, __b} = getTemplateValues(node, `const __a = __b[${__i.name}]`);
                
                __c.body.shift();
                
                return `for (const ${__a.name} of ${__b.name}) __c`;
            },
        }),
    };
    
    const input = 'for (let i = 0; i < n; i++) {const item = items[i]; log(item);}';
    
    const {code} = putout(input, {
        plugins: [{
            'convert-for-to-for-of': addVar,
        }],
    });
    
    const expected = 'for (const item of items) {\n  log(item);\n};';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

