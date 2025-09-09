'use strict';

const {test} = require('supertape');

const {
    template,
    operator,
    print,
} = require('putout');

const {
    hasTagName,
    getAttributePath,
    getAttributeNode,
    getAttributeValue,
} = require('./jsx.js');

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

test('putout: operator: jsx: getAttributePath', (t) => {
    const ast = template.ast('<hello><world className="hello"/></hello>');
    
    traverse(ast, {
        JSXElement(path) {
            const classNamePath = getAttributePath(path, 'className');
            classNamePath.remove();
        },
    });
    
    const result = print(ast);
    const expected = '<hello><world/></hello>;\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: jsx: getAttributePath: no', (t) => {
    const ast = template.ast('<hello><world/></hello>;');
    let result = null;
    
    traverse(ast, {
        JSXElement(path) {
            result = getAttributePath(path, 'className');
        },
    });
    
    t.notOk(result);
    t.end();
});

test('putout: operator: jsx: getAttributeNode', (t) => {
    const ast = template.ast('<hello className="world"/>');
    const node = getAttributeNode(ast, 'className');
    
    const expected = 'JSXAttribute';
    
    t.equal(node.type, expected);
    t.end();
});

test('putout: operator: jsx: getAttributeNode: no', (t) => {
    const ast = template.ast('<hello className="world"/>');
    const node = getAttributeNode(ast, 'data-name');
    
    t.notOk(node);
    t.end();
});

test('putout: operator: jsx: getAttributeValue', (t) => {
    const node = template.ast('<hello className="world"/>');
    const result = getAttributeValue(node, 'className');
    const expected = 'world';
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: jsx: getAttributeValue: no', (t) => {
    const node = template.ast('<hello className="world"/>');
    const result = getAttributeValue(node, 'data-name');
    const expected = '';
    
    t.equal(result, expected);
    t.end();
});
