'use strict';

const tryCatch = require('try-catch');
const {test} = require('supertape');

const {extract} = require('./extract');

test('operate: extract: Identifier', (t) => {
    const name = 'hello';
    const node = {
        type: 'Identifier',
        name,
    };
    
    const value = extract(node);
    
    t.equal(name, value);
    t.end();
});

test('operate: extract: JSXText', (t) => {
    const value = 'hello';
    const node = {
        type: 'JSXText',
        value,
    };
    
    const result = extract(node);
    
    t.equal(result, value);
    t.end();
});

test('operate: extract: path', (t) => {
    const name = 'hello';
    const node = {
        type: 'Identifier',
        name,
    };
    
    const value = extract({
        node,
    });
    
    t.equal(name, value);
    t.end();
});

test('operate: extract: Literal', (t) => {
    const value = 'hello';
    const node = {
        type: 'StringLiteral',
        value,
    };
    
    const result = extract(node);
    
    t.equal(result, value);
    t.end();
});

test('operate: extract: TemplateLiteral', (t) => {
    const raw = 'hello';
    const node = {
        type: 'TemplateLiteral',
        quasis: [{
            type: 'TemplateElement',
            value: {
                raw,
            },
        }],
    };
    
    const result = extract(node);
    
    t.equal(result, raw);
    t.end();
});

test('operate: extract: TemplateElement', (t) => {
    const raw = 'hello';
    const node = {
        type: 'TemplateElement',
        value: {
            raw,
        },
    };
    
    const result = extract(node);
    
    t.equal(result, raw);
    t.end();
});

test('operate: extract: RegExpLiteral', (t) => {
    const pattern = 'hello';
    const node = {
        type: 'RegExpLiteral',
        pattern,
    };
    
    const result = extract(node);
    
    t.equal(result, pattern);
    t.end();
});

test('operate: extract: ClassMethod: Identifier', (t) => {
    const name = 'hello';
    const node = {
        type: 'ClassMethod',
        key: {
            type: 'Identifier',
            name,
        },
    };
    
    const result = extract(node);
    
    t.equal(result, name);
    t.end();
});

test('operate: extract: ClassMethod: Literal', (t) => {
    const value = 'hello';
    const node = {
        type: 'ClassMethod',
        key: {
            type: 'StringLiteral',
            value,
        },
    };
    
    const result = extract(node);
    
    t.equal(result, value);
    t.end();
});

test('operate: extract: MemberExpression', (t) => {
    const value = 'hello.world';
    const node = {
        type: 'MemberExpression',
        object: {
            type: 'Identifier',
            name: 'hello',
        },
        property: {
            type: 'Identifier',
            name: 'world',
        },
    };
    
    const result = extract(node);
    
    t.equal(result, value);
    t.end();
});

test('operate: extract: ArrayExpression', (t) => {
    const value = 'hello,world';
    const node = {
        type: 'ArrayExpression',
        elements: [{
            type: 'ArrayExpression',
            elements: [{
                type: 'Identifier',
                name: 'hello',
            }],
        }, {
            type: 'Identifier',
            name: 'world',
        }],
    };
    
    const result = extract(node);
    
    t.equal(result, value);
    t.end();
});

test('operate: extract: TSTypeReference', (t) => {
    const value = 'hello';
    const node = {
        type: 'TSTypeReference',
        typeName: {
            type: 'Identifier',
            name: 'hello',
        },
    };
    
    const result = extract(node);
    
    t.equal(result, value);
    t.end();
});

test('operate: extract: JSXAttribute: name', (t) => {
    const name = 'hello';
    const node = {
        type: 'JSXAttribute',
        name: {
            type: 'JSXIdentifier',
            name,
        },
    };
    
    const result = extract(node);
    
    t.equal(result, name);
    t.end();
});

test('operate: extract: TSTypeParameter: name', (t) => {
    const name = 'hello';
    const node = {
        type: 'TSTypeParameter',
        name: {
            type: 'Identifier',
            name,
        },
    };
    
    const result = extract(node);
    
    t.equal(result, name);
    t.end();
});

test('operate: extract: unknown', (t) => {
    const value = 'hello';
    const node = {
        type: 'UnknownStatement',
        value,
    };
    
    const [error] = tryCatch(extract, node);
    const expected = `'operator.extract(node)' understands only Literals, Identifiers, TemplateLiteral, TemplateElement, RegExpLiteral, ArrayExpression, MemberExpression, JSXAttribute, JSXText, TSTypeParameter and TSTypeReference🤷, found: UnknownStatement`;
    
    t.equal(error.message, expected);
    t.end();
});
