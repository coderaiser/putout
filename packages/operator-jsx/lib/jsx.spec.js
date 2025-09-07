'use strict';

const {test} = require('supertape');

const {template, operator} = require('putout');

const {hasTagName} = require('./jsx.js');
const {traverse} = operator;

test('putout: operator: jsx: hasTagName', (t) => {
    let result = false;
    const ast = template.ast('<hello><world/></hello>');
    
    traverse(ast, {
        JSXElement(path) {
            result = hasTagName(path, 'world');
        },
    });
    
    t.ok(result);
    t.end();
});

test('putout: operator: jsx: hasTagName: no', (t) => {
    let result = false;
    const ast = template.ast('<hello><world/></hello>');
    
    result = hasTagName(ast, 'world');
    
    t.notOk(result);
    t.end();
});

test('putout: operator: jsx: hasTagName: wrong node', (t) => {
    const ast = template.ast('a = 3');
    const result = hasTagName(ast, 'world');
    
    t.notOk(result);
    t.end();
});
