'use strict';

const test = require('@putout/test')(__dirname, {
    putout: require('..'),
});

test('plugin-putout: transform', (t) => {
    t.transform('no-transform-code');
    t.end();
});

test('plugin-putout: transform: shorten putout exports', (t) => {
    t.transform('shorten-putout-exports');
    t.end();
});

test('plugin-putout: convert-destructuring-to-identifier: report: destructuring', (t) => {
    t.report('convert-destructuring-to-identifier', 'Identifier should be used instead of empty destructuring');
    t.end();
});

test('plugin-putout: convert-destructuring-todentifier: transform: destructuring', (t) => {
    t.transform('convert-destructuring-to-identifier');
    t.end();
});

test('plugin-putout: convert-node-to-path-in-get-template-values: transform', (t) => {
    t.transform('get-template-values');
    t.end();
});

test('plugin-putout: convert-traverse-to-include: transform', (t) => {
    t.transform('convert-traverse-to-include');
    t.end();
});
