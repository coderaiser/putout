'use strict';

const {test} = require('supertape');
const {template} = require('putout');
const {getLiteralRaw} = require('./get-literal-raw');

test('operate: getLiteralRaw: root', (t) => {
    const node = {
        raw: 'x',
    };
    
    const result = getLiteralRaw(node);
    
    t.equal(result, node.raw);
    t.end();
});

test('operate: getLiteralRaw: path', (t) => {
    const node = {
        raw: 'x',
    };
    
    const path = {
        node,
    };
    
    const result = getLiteralRaw(path);
    
    t.equal(result, node.raw);
    t.end();
});

test('operate: getLiteralRaw: after template', (t) => {
    const node = template.ast.fresh('const a = "x"');
    const {init} = node.declarations[0];
    const result = getLiteralRaw(init);
    const {raw} = init.extra;
    
    t.equal(result, raw);
    t.end();
});

test('operate: getLiteralRaw: empty string', (t) => {
    const node = {
        raw: '',
    };
    
    const path = {
        node,
    };
    
    const result = getLiteralRaw(path);
    
    t.equal(result, node.raw);
    t.end();
});

test('operate: getLiteralRaw: no raw, no extra', (t) => {
    const node = {
        value: 'hello',
    };
    
    const path = {
        node,
    };
    
    const result = getLiteralRaw(path);
    const expected = `'hello'`;
    
    t.equal(result, expected);
    t.end();
});

test('operate: getLiteralRaw: no raw, no extra: quote', (t) => {
    const node = {
        value: `hello: 'world'`,
    };
    
    const path = {
        node,
    };
    
    const result = getLiteralRaw(path);
    const expected = `'hello: \\'world\\''`;
    
    t.equal(result, expected);
    t.end();
});

test('operate: getLiteralRaw: no raw, no extra: quote: slash', (t) => {
    const node = {
        value: `hello\\'world'`,
    };
    
    const path = {
        node,
    };
    
    const result = getLiteralRaw(path);
    const expected = `'hello\\'world''`;
    
    t.equal(result, expected);
    t.end();
});
