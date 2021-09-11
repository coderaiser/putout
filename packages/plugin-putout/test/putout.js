'use strict';

const test = require('@putout/test')(__dirname, {
    putout: require('..'),
});

test('plugin-putout: transform', (t) => {
    t.transform('no-transform-code');
    t.end();
});

test('plugin-putout: complex: transform: shorten putout exports', (t) => {
    t.transform('shorten-putout-exports');
    t.end();
});

test('plugin-putout: convert-destructuring-to-identifier: complex: report: destructuring', (t) => {
    t.report('convert-destructuring-to-identifier', 'Identifier should be used instead of empty destructuring');
    t.end();
});

test('plugin-putout: convert-destructuring-todentifier: complex: transform: destructuring', (t) => {
    t.transform('convert-destructuring-to-identifier');
    t.end();
});

test('plugin-putout: convert-node-to-path-in-get-template-values: complex: transform', (t) => {
    t.transform('get-template-values');
    t.end();
});

test('plugin-putout: convert-traverse-to-include: complex: transform', (t) => {
    t.transform('convert-traverse-to-include');
    t.end();
});

test('plugin-putout: convert-traverse-to-include: complex: transform: traverse-to-repalce', (t) => {
    t.transform('convert-traverse-to-replace');
    t.end();
});

test('plugin-putout: convert-process-to-find: complex transform', (t) => {
    t.transform('convert-process-to-find');
    t.end();
});

test('plugin-putout: convert-method-to-property: complex: transform', (t) => {
    t.transform('convert-method-to-property');
    t.end();
});

test('plugin-putout: convert-method-to-property: complex: transform: apply-processors-destrcturing', (t) => {
    t.transform('apply-processors-destructuring');
    t.end();
});

test('plugin-putout: check-replace-code: complex: report', (t) => {
    t.report('check-replace-code', `☝️ Looks like template values not linked: ["__b"] ["__a"]`);
    t.end();
});

