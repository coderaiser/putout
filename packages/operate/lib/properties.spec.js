'use strict';

const {
    parse,
    operator,
    print,
} = require('putout');

const {test} = require('supertape');
const {findProperty, findProperties} = require('./properties');

const {traverse} = operator;

test('operate: properties: findProperties', (t) => {
    const ast = parse(`({"hello": 'world'})`);
    
    traverse(ast, {
        ObjectExpression: (path) => {
            const {helloPath} = findProperties(path, ['hello']);
            helloPath.remove();
        },
    });
    
    const result = print(ast);
    const expected = '(({}))';
    
    t.deepEqual(result, expected);
    t.end();
});

test('operate: properties: findProperties: Identifier', (t) => {
    const ast = parse(`({hello: 'world'})`);
    
    traverse(ast, {
        ObjectExpression: (path) => {
            const {helloPath} = findProperties(path, ['hello']);
            helloPath.remove();
        },
    });
    
    const result = print(ast);
    const expected = '(({}))';
    
    t.deepEqual(result, expected);
    t.end();
});

test('operate: properties: findProperty', (t) => {
    const ast = parse(`({"hello": 'world'})`);
    
    traverse(ast, {
        ObjectExpression: (path) => {
            const helloPath = findProperty(path, 'hello');
            helloPath.remove();
        },
    });
    
    const result = print(ast);
    const expected = '(({}))';
    
    t.deepEqual(result, expected);
    t.end();
});

test('operate: properties: findProperty: not found', (t) => {
    let result;
    const ast = parse(`({"hello": 'world'})`);
    
    traverse(ast, {
        ObjectExpression: (path) => {
            result = findProperty(path, 'world');
        },
    });
    
    t.notOk(result);
    t.end();
});

