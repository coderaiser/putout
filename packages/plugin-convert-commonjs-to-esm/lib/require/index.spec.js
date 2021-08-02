'use strict';

const convert = require('.');
const test = require('@putout/test')(__dirname, {
    'convert-commonjs-to-esm/require': convert,
});

test('plugin-convert-commonjs-to-esm: require: transform: report', (t) => {
    t.report('require', 'ESM should be used insted of Commonjs');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform', (t) => {
    t.transform('require');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform: destructuring', (t) => {
    t.transform('destructuring');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform: comment', (t) => {
    t.transform('comment');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform: relative', (t) => {
    t.transform('relative');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform: json', (t) => {
    t.transform('json');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform: inner require', (t) => {
    t.transform('inner-require');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform: lonely', (t) => {
    t.transform('lonely');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform: no require', (t) => {
    t.noTransform('no-require');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform: no call', (t) => {
    t.noTransform('no-call');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: no transform: not literal argument', (t) => {
    t.noTransform('not-literal-argument');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: no transform: create require', (t) => {
    t.noTransform('create-require');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform: evaluate', (t) => {
    t.transform('evaluate');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform: require-is-argument', (t) => {
    t.transform('require-is-argument');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform: default', (t) => {
    t.transform('default');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: no transform: no evaluate', (t) => {
    t.noTransform('no-evaluate');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: no transform: not-string-argument', (t) => {
    t.noTransform('not-string-argument');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: no transform: inner-json', (t) => {
    t.noTransform('inner-json');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: no report: not literal argument', (t) => {
    t.noReport('not-literal-argument');
    t.end();
});

