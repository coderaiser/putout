'use strict';

const {test} = require('supertape');

const {
    template,
    operator,
    print,
} = require('putout');

const tryCatch = require('try-catch');

const {
    addClassName,
    removeClassName,
    containsClassName,
    hasDataName,
    hasTagName,
    getAttributePath,
    getAttributeNode,
    getAttributeValue,
    addAttributeValue,
    setAttributeValue,
    removeAttributeValue,
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

test('putout: operator: jsx: addAttributeValue', (t) => {
    const node = template.ast.fresh('<hello className="world"/>');
    addAttributeValue(node, 'className', 'abc');
    
    const result = print(node);
    const expected = '<hello className="world abc"/>;\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: jsx: addAttributeValue: exists', (t) => {
    const node = template.ast.fresh('<hello className="world"/>');
    addAttributeValue(node, 'className', 'world');
    
    const result = print(node);
    const expected = '<hello className="world"/>;\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: jsx: removeAttributeValue: path', (t) => {
    const ast = template.ast.fresh('<section><hello className="hello world"/></section>');
    
    traverse(ast, {
        JSXElement(path) {
            removeAttributeValue(path, 'className', 'world');
        },
    });
    
    const result = print(ast);
    const expected = `<section><hello className="hello"/></section>;\n`;
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: jsx: removeAttributeValue', (t) => {
    const node = template.ast.fresh('<hello className="hello world"/>');
    removeAttributeValue(node, 'className', 'world');
    
    const result = print(node);
    const expected = `<hello className="hello"/>;\n`;
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: jsx: setAttributeValue', (t) => {
    const node = template.ast.fresh('<hello className="hello"/>');
    setAttributeValue(node, 'className', 'world');
    
    const result = print(node);
    const expected = `<hello className="world"/>;\n`;
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: jsx: setAttributeValue: no', (t) => {
    const [error] = tryCatch(setAttributeValue, null, 'className', 'world');
    
    t.notOk(error);
    t.end();
});

test('putout: operator: jsx: removeAttributeValue: no path', (t) => {
    const [error] = tryCatch(removeAttributeValue, null, 'className', 'world');
    
    t.notOk(error);
    t.end();
});

test('putout: operator: jsx: addClassName', (t) => {
    const node = template.ast.fresh('<hello className="hello"/>');
    addClassName(node, 'world');
    
    const result = print(node);
    const expected = `<hello className="hello world"/>;\n`;
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: jsx: removeClassName', (t) => {
    const node = template.ast.fresh('<hello className="hello world"/>');
    removeClassName(node, 'world');
    
    const result = print(node);
    const expected = `<hello className="hello"/>;\n`;
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: jsx: containsClassName', (t) => {
    const node = template.ast.fresh('<hello className="hello world"/>');
    const result = containsClassName(node, 'world');
    
    t.ok(result);
    t.end();
});

test('putout: operator: jsx: hasDataName', (t) => {
    const node = template.ast.fresh('<hello data-name="hello"/>');
    const result = hasDataName(node, 'hello');
    
    t.ok(result);
    t.end();
});
