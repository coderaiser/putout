'use strict';

const test = require('supertape');
const {template, parse} = require('@putout/engine-parser');

const {
    compare,
    compareAll,
    compareAny,
} = require('..');

test('compare: base is string', (t) => {
    const a = template.ast('const a = "hello"');
    const b = template.ast('const a = "__"');
    
    const result = compare(a, b);
    
    t.ok(result, 'should equal');
    t.end();
});

test('compare: false property', (t) => {
    const result = compare('async () => {}', '() => {}');
    
    t.notOk(result, 'should not equal');
    t.end();
});

test('compare: identifier', (t) => {
    const result = compare('hello', '__');
    
    t.ok(result, 'should equal');
    t.end();
});

test('compare: string literal: raw', (t) => {
    const ast1 = parse(`'madrun'`);
    const ast2 = parse(`"madrun"`);
    
    const result = compare(ast1, ast2);
    
    t.ok(result, 'should equal');
    t.end();
});

test('compare: literal', (t) => {
    const result = compare('"hi"', '"__"');
    
    t.ok(result, 'should equal');
    t.end();
});

test('compare: base is string: path', (t) => {
    const node = template.ast('const a = "hello"');
    const b = template.ast('const a = "__"');
    
    const result = compare({node}, b);
    
    t.ok(result, 'should equal');
    t.end();
});

test('compare: base is string: no', (t) => {
    const a = template.ast('const a = 5');
    const b = template.ast('const a = "__"');
    
    const result = compare(a, b);
    
    t.notOk(result, 'should equal');
    t.end();
});

test('compare: base is any', (t) => {
    const a = template.ast('const a = {}');
    const b = template.ast('const a = __');
    
    const result = compare(a, b);
    
    t.ok(result, 'should equal');
    t.end();
});

test('compare: strings', (t) => {
    const result = compare('const a = {}', 'if (2 > 3)__');
    
    t.notOk(result, 'should equal');
    t.end();
});

test('compare: all: base is all', (t) => {
    const result = compareAll('const a = {}', [
        'const a  = __',
    ]);
    
    t.ok(result, 'should equal');
    t.end();
});

test('compare: all: base is all: no', (t) => {
    const result = compareAll('const a = {}', [
        'const a = " "',
        'const a  = "__"',
        'const a  = __',
    ]);
    
    t.notOk(result, 'should equal');
    t.end();
});

test('compare: any: base is any', (t) => {
    const result = compareAny('const a = {}', [
        'const a = " "',
        'const a  = "__"',
        'const a  = __',
    ]);
    
    t.ok(result, 'should equal');
    t.end();
});

test('compare: any: base is any: no', (t) => {
    const result = compareAny('const a = {}', [
        'const a = " "',
        'const a  = "__"',
    ]);
    
    t.notOk(result, 'should equal');
    t.end();
});

