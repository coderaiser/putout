'use strict';

const {createTest} = require('@putout/test');
const eslint = require('..');

const test = createTest(__dirname, {
    eslint,
});

test('putout: plugin-eslint: report: move-putout-to-end-in-extends', (t) => {
    t.report('json', '"putout" should be in the end of the "extends" list');
    t.end();
});

test('putout: plugin-eslint: transform: move-putout-to-end-in-extends', (t) => {
    t.transform('json');
    t.end();
});

test('putout: plugin-eslint: transform: convert-ide-to-safe', (t) => {
    t.transform('convert-ide-to-safe');
    t.end();
});

test('putout: plugin-eslint: transform: apply-safe-align', (t) => {
    t.transform('apply-safe-align');
    t.end();
});

test('putout: plugin-eslint: transform: convert-require-to-import', (t) => {
    t.transform('convert-require-to-import');
    t.end();
});

test('putout: plugin-eslint: transform: remove-no-unpublished-require', (t) => {
    t.transform('remove-no-unpublished-require');
    t.end();
});

test('putout: plugin-eslint: transform: remove-overrides-with-empty-rules', (t) => {
    t.transform('remove-overrides-with-empty-rules');
    t.end();
});

test('putout: plugin-eslint: transform: remove-no-missing', (t) => {
    t.transform('remove-no-missing');
    t.end();
});

test('putout: plugin-eslint: transform: remove-no-unsupported-features', (t) => {
    t.transform('remove-no-unsupported-features');
    t.end();
});

test('putout: plugin-eslint: transform: add-putout', (t) => {
    t.transform('add-putout');
    t.end();
});

test('putout: plugin-eslint: transform: convert-node-to-n', (t) => {
    t.transform('convert-node-to-n');
    t.end();
});

