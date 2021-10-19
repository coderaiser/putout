'use strict';

const applyDestructuring = require('..');

const test = require('@putout/test')(__dirname, {
    'apply-destructuring': applyDestructuring,
});

test('plugin-apply-destructuring: transform: report', (t) => {
    t.report('object', 'Object destructuring should be used');
    t.end();
});

test('plugin-apply-destructuring: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-apply-destructuring: transform: array', (t) => {
    const code = 'const name = array[0];';
    const fix = 'const [name] = array;';
    
    t.transformCode(code, fix);
    t.end();
});

test('plugin-apply-destructuring: transform: array: destructuring', (t) => {
    const code = 'const {name} = array[0]';
    
    t.noTransformCode(code);
    t.end();
});

test('plugin-apply-destructuring: transform: vars', (t) => {
    t.transform('vars');
    t.end();
});

test('plugin-apply-destructuring: transform: logical', (t) => {
    t.transform('logical');
    t.end();
});

test('plugin-apply-destructuring: no transform: logical: and', (t) => {
    t.noTransform('logical-and');
    t.end();
});

test('plugin-apply-destructuring: transform: multiple', (t) => {
    t.transform('multiple');
    t.end();
});

