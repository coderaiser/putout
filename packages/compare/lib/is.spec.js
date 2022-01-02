'use strict';

const tryCatch = require('try-catch');

const test = require('supertape');
const {
    parseTemplate,
    isNameStr,
    isObjectStr,
    isArrayStr,
    isAnyStr,
    isTemplate,
} = require('./is');

test('compare: is: parseTemplate: program', (t) => {
    const [node] = parseTemplate('const t = "hi"', {
        program: true,
    });
    
    t.equal(node.type, 'Program');
    t.end();
});

test('compare: is: parseTemplate: cache exceptions', (t) => {
    let error;
    
    [error] = tryCatch(parseTemplate, 'if');
    [error] = tryCatch(parseTemplate, 'if');
    
    t.match(error.message, '@babel/template', 'should not cache exceptions');
    t.end();
});

test('compare: is: isNameStr: no', (t) => {
    const result = isNameStr('hello');
    
    t.notOk(result);
    t.end();
});

test('compare: is: isNameStr: yes', (t) => {
    const result = isNameStr('__a');
    
    t.ok(result);
    t.end();
});

test('compare: is: isObjectStr: no', (t) => {
    const result = isObjectStr('hello');
    
    t.notOk(result);
    t.end();
});

test('compare: is: isObjectStr', (t) => {
    const result = isObjectStr('__object');
    
    t.ok(result);
    t.end();
});

test('compare: is: isArrayStr', (t) => {
    const result = isArrayStr('__array');
    
    t.ok(result);
    t.end();
});

test('compare: is: isAnyStr', (t) => {
    const result = isAnyStr('__');
    
    t.ok(result);
    t.end();
});

test('compare: is: isTemplate: type', (t) => {
    const result = isTemplate('ArrowFunctionExpression');
    
    t.equal(typeof result, 'boolean');
    t.end();
});

test('compare: is: isTemplate: big char', (t) => {
    const result = isTemplate('__a instanceof Array');
    
    t.ok(result);
    t.end();
});

test('compare: is: isTemplate: big char is first', (t) => {
    const result = isTemplate('X instanceof Array');
    
    t.ok(result);
    t.end();
});

test('compare: is: isTemplate: "."', (t) => {
    const result = isTemplate('Readable.from`hello`');
    
    t.ok(result);
    t.end();
});

