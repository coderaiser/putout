'use strict';

const {createTest} = require('@putout/test');
const nodejs = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['nodejs', nodejs],
    ],
});

test('putout: plugin: nodejs: convert-fs-promises: transform', (t) => {
    t.transform('fs');
    t.end();
});

test('putout: plugin: nodejs: convert-promisify-to-fs-promises: transform', (t) => {
    t.transform('promisify');
    t.end();
});

test('putout: plugin: nodejs: transform: convert-dirname-to-url', (t) => {
    t.transform('convert-dirname-to-url');
    t.end();
});

test('putout: plugin: nodejs: transform: convert-url-to-dirname', (t) => {
    t.transform('convert-url-to-dirname');
    t.end();
});

test('putout: plugin: nodejs: transform: remove-process-exit', (t) => {
    t.transform('remove-process-exit');
    t.end();
});

test('putout: plugin: nodejs: transform: declare', (t) => {
    t.transform('declare');
    t.end();
});

test('putout: plugin: nodejs: transform: declare-after-require', (t) => {
    t.transform('declare-after-require');
    t.end();
});

test('putout: plugin: nodejs: transform: convert-top-level-return', (t) => {
    t.transform('convert-top-level-return', '\n');
    t.end();
});

test('putout: plugin: nodejs: no transform: type', (t) => {
    t.noTransformCode('type();\n');
    t.end();
});

test('putout: plugin: nodejs: transform: convert-buffer-to-buffer-alloc', (t) => {
    t.transform('convert-buffer-to-buffer-alloc');
    t.end();
});

test('plugin-nodejs: transform: add-node-prefix', (t) => {
    t.transform('add-node-prefix');
    t.end();
});

test('plugin-nodejs: transform: convert-exports-to-module-exports', (t) => {
    t.transform('convert-exports-to-module-exports');
    t.end();
});

test('plugin-nodejs: no transform: cjs-file: disabled', (t) => {
    t.noTransform('cjs-file-disabled');
    t.end();
});

test('plugin-nodejs: no transform: mjs-file: disabled', (t) => {
    t.noTransform('mjs-file-disabled');
    t.end();
});

test('plugin-nodejs: no transform: rename-file-cjs-to-js: disabled', (t) => {
    t.noTransform('rename-file-cjs-to-js-disabled');
    t.end();
});

test('plugin-nodejs: no transform: rename-file-mjs-to-js: disabled', (t) => {
    t.noTransform('rename-file-mjs-to-js-disabled');
    t.end();
});

test('plugin-nodejs: no transform: add-missing-strict-mode', (t) => {
    t.noTransform('add-missing-strict-mode');
    t.end();
});

test('plugin-nodejs: transform: remove-useless-strict-mode', (t) => {
    t.transform('remove-useless-strict-mode');
    t.end();
});

test('plugin-nodejs: transform: remove-useless-promisify', (t) => {
    t.transform('remove-useless-promisify');
    t.end();
});

test('plugin-nodejs: transform: remove-illegal-strict-mode', (t) => {
    t.transform('remove-illegal-strict-mode');
    t.end();
});

test('plugin-nodejs: transform: group-require-by-id', (t) => {
    t.transform('group-require-by-id');
    t.end();
});
