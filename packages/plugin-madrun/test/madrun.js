'use strict';

const test = require('@putout/test')(__dirname, {
    madrun: require('..'),
});

test('plugin-madrun: transform', (t) => {
    t.transform('madrun');
    t.end();
});

test('plugin-madrun: transform: no module.exports', (t) => {
    t.noTransform('no-module-exports');
    t.end();
});

test('plugin-madrun: no transform: module.exports not object', (t) => {
    t.noTransform('module-exports-not-object');
    t.end();
});

test('plugin-madrun: add-fresh-lint', (t) => {
    t.transform('fresh-lint');
    t.end();
});

test('plugin-madrun: convert-nyc-to-c8', (t) => {
    t.transform('coverage');
    t.end();
});

