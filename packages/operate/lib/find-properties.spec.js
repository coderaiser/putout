'use strict';

const {
    parse,
    operator,
    print,
} = require('putout');
const {test} = require('supertape');
const {findProperties} = require('./find-properties');

const {traverse} = operator;

test('operate: find-properties', (t) => {
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

test('operate: find-properties: Identifier', (t) => {
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
