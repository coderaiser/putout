'use strict';

const {
    parse,
    operator,
    print,
} = require('putout');

const {test} = require('supertape');
const montag = require('montag');
const {setLiteralValue} = require('./set-literal-value');

const {traverse} = operator;

test('operate: setLiteralValue', (t) => {
    const ast = parse(`({"hello": 'world'})`);
    
    traverse(ast, {
        StringLiteral: (path) => {
            setLiteralValue(path, 'hello');
        },
    });
    
    const result = print(ast);
    
    const expected = montag`
        ({
            "hello": 'hello',
        });\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('operate: setLiteralValue: node', (t) => {
    const ast = parse(`({"hello": 'world'})`);
    
    traverse(ast, {
        StringLiteral: (path) => {
            setLiteralValue(path.node, 'hello');
        },
    });
    
    const result = print(ast);
    
    const expected = montag`
        ({
            "hello": 'hello',
        });\n
    `;
    
    t.equal(result, expected);
    t.end();
});
