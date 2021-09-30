'use strict';

const convert = require('.');
const test = require('@putout/test')(__dirname, {
    'convert-commonjs-to-esm/commons': convert,
});

test('plugin-convert-commonjs-to-esm: commons: report', (t) => {
    t.report('commons', '"__filename" and "__dirname" should be declared');
    t.end();
});

test('plugin-convert-commonjs-to-esm: commons: transform', (t) => {
    t.transform('commons');
    t.end();
});

test('plugin-convert-commonjs-to-esm: commons: transform: require', (t) => {
    t.transform('require');
    t.end();
});

test('plugin-convert-commonjs-to-esm: commons: transform: top-level-require', (t) => {
    t.transform('top-level-require');
    t.end();
});

test('plugin-convert-commonjs-to-esm: commons: no transform: declared require', (t) => {
    t.noTransform('declared-require');
    t.end();
});

test('plugin-convert-commonjs-to-esm: commons: no transform', (t) => {
    t.noTransformCode('const a = 5');
    t.end();
});

