'use strict';

const {createTest} = require('@putout/test');
const putout = require('..');

const test = createTest(__dirname, {
    putout,
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

test('plugin-putout: convert-putout-test-to-create-test', (t) => {
    t.transform('convert-putout-test-to-create-test');
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

test('plugin-putout: convert-method-to-property: complex: transform: apply-async-formatter', (t) => {
    t.transform('apply-async-formatter');
    t.end();
});

test('plugin-putout: check-replace-code: complex: report', (t) => {
    t.report('check-replace-code', `☝️ Looks like template values not linked: ["__a"] -> ["__b"]`);
    t.end();
});

test('plugin-putout: convert-method-to-property: complex: transform: declare', (t) => {
    t.transform('declare');
    t.end();
});

test('plugin-putout: convert-method-to-property: complex: transform: add-args', (t) => {
    t.transform('add-args');
    t.end();
});

test('plugin-putout: transform: add-push', (t) => {
    t.transform('add-push');
    t.end();
});

test('plugin-putout: convert-add-argument-to-add-args', (t) => {
    t.transform('convert-add-argument-to-add-args');
    t.end();
});

test('plugin-putout: transform: move-require-on-top-level', (t) => {
    t.transform('move-require-on-top-level');
    t.end();
});

test('plugin-putout: transform: convert-dirname-to-url', (t) => {
    t.transform('convert-dirname-to-url');
    t.end();
});

test('plugin-putout: transform: convert-url-to-dirname', (t) => {
    t.transform('convert-url-to-dirname');
    t.end();
});

test('plugin-putout: transform: apply-create-test', (t) => {
    t.transform('apply-create-test');
    t.end();
});

test('plugin-putout: transform: includer', (t) => {
    t.transform('includer');
    t.end();
});

test('plugin-putout: transform: convert-replace-to-function', (t) => {
    t.transform('convert-replace-to-function');
    t.end();
});

test('plugin-putout: transform: convert-match-to-function', (t) => {
    t.transform('convert-match-to-function');
    t.end();
});

test('plugin-putout: transform: apply-remove', (t) => {
    t.transform('apply-remove');
    t.end();
});

test('plugin-putout: transform: replace-test-message', (t) => {
    t.transform('replace-test-message');
    t.end();
});

test('plugin-putout: transform: convert-report-to-function', (t) => {
    t.transform('convert-report-to-function');
    t.end();
});

