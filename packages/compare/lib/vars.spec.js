'use strict';

const test = require('supertape');
const putout = require('putout');
const {template} = require('@putout/engine-parser');

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

test('putout: compare: getTemplateValues: __array', (t) => {
    const node = template.ast('const [] = array');
    const {__array} = getTemplateValues(node, 'const __array = __');
    
    t.equal(__array && __array.type, 'ArrayPattern');
    t.end();
});

test('putout: compare: getTemplateValues: __', (t) => {
    const node = template.ast('const [] = array');
    const {__} = getTemplateValues(node, 'const __array = __');
    
    t.equal(__ && __.type, 'Identifier');
    t.end();
});

test('putout: compare: getTemplateValues: __object', (t) => {
    const node = template.ast('const {} = obj');
    const {__object} = getTemplateValues(node, 'const __object = __');
    
    t.equal(__object.type, 'ObjectPattern');
    t.end();
});

test('putout: compare: vars: setValues : __args', (t) => {
    const applyToSpread = {
        report: () => '',
        replace: () => ({
            'function __a(__args){}': 'const __a = (__args) => {}',
        }),
    };
    
    const {code} = putout('function hello(a, b, c){}', {
        plugins: [{
            'convert-to-arrow': applyToSpread,
        }],
    });
    
    const expected = 'const hello = (a, b, c) => {};';
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: compare: vars: __imports', (t) => {
    const applyToSpread = {
        report: () => '',
        replace: () => ({
            'import __imports from "__a"': ({__imports, __a}) => {
                let result = 'const {\n';
                
                for (const {imported, local} of __imports) {
                    result += `${imported.name},`;
                }
                
                result += `\n} = require(${__a.raw});`;
                
                return result;
            },
        }),
    };
    
    const {code} = putout('import {hello} from "world"', {
        plugins: [{
            'convert-esm-to-commonjs': applyToSpread,
        }],
    });
    
    const expected = `const {\n  hello\n} = require('world');`;
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: compare: vars: identifier', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            '!!__a': '__a',
        }),
    };
    
    const {code} = putout('if (!!y) fn()', {
        fixCount: 1,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'if (y) fn()';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

