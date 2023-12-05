'use strict';

const {createTest} = require('@putout/test');
const filesystem = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: no report: rename-file: disabled', (t) => {
    t.noReport('rename-file-disabled');
    t.end();
});

test('plugin-filesystem: transform: remove-vim-swap-file', (t) => {
    t.transform('remove-vim-swap-file');
    t.end();
});

test('plugin-filesystem: no transform: rename-spec-to-test: disabled', (t) => {
    t.noTransform('rename-spec-to-test-disabled');
    t.end();
});

test('plugin-filesystem: no transform: rename-test-to-spec: disabled', (t) => {
    t.noTransform('rename-test-to-spec-disabled');
    t.end();
});

test('plugin-filesystem: no transform: rename-referenced-file: disabled', (t) => {
    t.noTransform('rename-referenced-file-disabled');
    t.end();
});

test('plugin-filesystem: no transform: move-referenced-file: disabled', (t) => {
    t.noTransform('move-referenced-file-disabled');
    t.end();
});

test('plugin-filesystem: no transform: remove-files: disabled', (t) => {
    t.noTransform('remove-files-disabled');
    t.end();
});

test('plugin-filesystem: no transform: convert-simple-filesystem-to-filesystem: disabled', (t) => {
    t.noTransform('convert-simple-filesystem-to-filesystem-disabled');
    t.end();
});

test('plugin-filesystem: no transform: convert-filesystem-to-simple-filesystem: disabled', (t) => {
    t.noTransform('convert-filesystem-to-simple-filesystem-disabled');
    t.end();
});

test('plugin-filesystem: no transform: bundle-css-disabled', (t) => {
    t.noTransform('bundle-css-disabled');
    t.end();
});
