'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');
const test = createTest(__dirname, {
    'convert-commonjs-to-esm/commons': convert,
});

test('plugin-convert-commonjs-to-esm: commons: report', (t) => {
    t.report('commons', '"__filename", "__dirname" and "require" should be declared in ESM');
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

