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
