'use strict';

const {
    parse,
    operator,
    print,
} = require('putout');

const {test} = require('supertape');
const {getProperty, getProperties} = require('./properties');

const {traverse} = operator;

test('operate: properties: getProperties', (t) => {
    const ast = parse(`({"hello": 'world'})`);
    
    traverse(ast, {
        ObjectExpression: (path) => {
            const {helloPath} = getProperties(path, ['hello']);
            helloPath.remove();
        },
    });
    
    const result = print(ast);
    const expected = '({})';
    
    t.equal(result, expected);
    t.end();
});

test('operate: properties: getProperties: Identifier', (t) => {
    const ast = parse(`({hello: 'world'})`);
    
    traverse(ast, {
        ObjectExpression: (path) => {
            const {helloPath} = getProperties(path, ['hello']);
            helloPath.remove();
        },
    });
    
    const result = print(ast);
    const expected = '({})';
    
    t.equal(result, expected);
    t.end();
});

test('operate: properties: getProperty', (t) => {
    const ast = parse(`({"hello": 'world'})`);
    
    traverse(ast, {
        ObjectExpression: (path) => {
            const helloPath = getProperty(path, 'hello');
            helloPath.remove();
        },
    });
    
    const result = print(ast);
    const expected = '({})';
    
    t.equal(result, expected);
    t.end();
});

test('operate: properties: getProperty: not found', (t) => {
    let result;
    const ast = parse(`({"hello": 'world'})`);
    
    traverse(ast, {
        ObjectExpression: (path) => {
            result = getProperty(path, 'world');
        },
    });
    
    t.notOk(result);
    t.end();
});

