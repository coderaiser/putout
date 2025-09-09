'use strict';

const {
    parse,
    operator,
    print,
    template,
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
            'hello': 'hello',
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
            'hello': 'hello',
        });\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('operate: setLiteralValue: no raw', (t) => {
    const node = template.ast('import z from "y"');
    setLiteralValue(node.source, 'hello');
    
    const result = print(node);
    
    const expected = montag`
        import z from 'hello';\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('operate: setLiteralValue: raw: escape', (t) => {
    const node = {
        type: 'StringLiteral',
        raw: `"export default 5;\\n import a from 'a';"`,
        value: `export default 5;\n import a from 'a';`,
    };
    
    setLiteralValue(node, 'hello');
    
    const result = print(node);
    const expected = montag`
        'hello';\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('operate: setLiteralValue: empty double quotes in raw', (t) => {
    const ast = parse(`({"hello": ""})`);
    
    traverse(ast, {
        StringLiteral: (path) => {
            setLiteralValue(path, 'hello');
        },
    });
    
    const result = print(ast);
    
    const expected = montag`
        ({
            'hello': 'hello',
        });\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('operate: setLiteralValue: empty: no raw', (t) => {
    const ast = parse(`<a data-name=""></a>`);
    
    traverse(ast, {
        StringLiteral: (path) => {
            delete path.node.raw;
            setLiteralValue(path.node, 'hello');
        },
    });
    
    const result = print(ast);
    
    const expected = montag`
        <a data-name="hello"></a>;\n
    `;
    
    t.equal(result, expected);
    t.end();
});
