'use strict';

/* eslint node/no-unpublished-require:0 */
const convert = require('.');
const test = require('@putout/test')(__dirname, {
    'convert-commonjs-to-esm/exports': convert,
});

test('plugin-convert-esm-to-commonjs: require: transform: report', (t) => {
    t.report('require', 'ESM should be used insted of Commonjs');
    t.end();
});

test('plugin-convert-esm-to-commonjs: require: transform', (t) => {
    t.transform('require');
    t.end();
});

test('plugin-convert-esm-to-commonjs: require: transform: destructuring', (t) => {
    t.transform('destructuring');
    t.end();
});

test('plugin-convert-esm-to-commonjs: require: transform: comment', (t) => {
    t.transform('comment');
    t.end();
});

test('plugin-convert-esm-to-commonjs: require: transform: no require', (t) => {
    t.noTransform('no-require');
    t.end();
});

test('plugin-convert-esm-to-commonjs: require: transform: no call', (t) => {
    t.noTransform('no-call');
    t.end();
});

test('plugin-convert-esm-to-commonjs: require: transform: not literal argument', (t) => {
    t.noTransform('not-literal-argument');
    t.end();
});
