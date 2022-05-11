'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');
const test = createTest(__dirname, {
    'convert-commonjs-to-esm/require': convert,
});

test('plugin-convert-commonjs-to-esm: require: transform: report', (t) => {
    t.report('require', `Use 'ESM' instead of 'CommonJS'`);
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

test('plugin-convert-commonjs-to-esm: require: no transform: json (🐌 DISABLED FEATURE: IMPORT TYPE "JSON" https://2ality.com/2021/06/json-modules.html', (t) => {
    t.noTransform('json');
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

test('plugin-convert-commonjs-to-esm: require: no transform: no require', (t) => {
    t.noTransform('no-require');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: no transform: no call', (t) => {
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

test('plugin-convert-commonjs-to-esm: require: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: no transform: call-dot', (t) => {
    t.noTransform('call-dot');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform: chain', (t) => {
    t.transform('chain');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: no transform: chain declared', (t) => {
    t.noTransform('chain-declared');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform: chain kebab', (t) => {
    t.transform('chain-kebab');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform: call: kebab', (t) => {
    t.transform('call-kebab');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform: member', (t) => {
    t.transform('member');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: transform: call: kebab: namespace', (t) => {
    t.transform('call-kebab-namespace');
    t.end();
});

test('plugin-convert-commonjs-to-esm: require: no transform: call: declared', (t) => {
    t.noTransform('call-declared');
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

test('plugin-convert-commonjs-to-esm: require: no transform: package-json', (t) => {
    t.noTransform('package-json');
    t.end();
});
