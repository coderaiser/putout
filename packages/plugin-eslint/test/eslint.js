'use strict';

const eslint = require('../lib/index.js');
const {createTest} = require('@putout/test');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['eslint', eslint],
    ],
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

test('plugin-eslint: transform: convert-rc-to-flat', (t) => {
    t.transform('convert-rc-to-flat');
    t.end();
});

test('plugin-eslint: transform: remove-useless-slice', (t) => {
    t.transform('remove-useless-slice');
    t.end();
});

test('plugin-eslint: transform: convert-files-to-array', (t) => {
    t.transform('convert-files-to-array');
    t.end();
});

test('putout: plugin-eslint: transform: declare', (t) => {
    t.transform('declare');
    t.end();
});

test('plugin-eslint: transform: apply-match-to-flat', (t) => {
    t.transform('apply-match-to-flat');
    t.end();
});

test('plugin-eslint: transform: apply-dir-to-flat', (t) => {
    t.transform('apply-dir-to-flat');
    t.end();
});
