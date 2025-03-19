'use strict';

const {createTest} = require('@putout/test');
const filesystem = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: no report: rename-file: rename-file-disabled', (t) => {
    t.noReport('rename-file-disabled');
    t.end();
});

test('plugin-filesystem: transform: remove-vim-swap-file', (t) => {
    t.transform('remove-vim-swap-file');
    t.end();
});

test('plugin-filesystem: no transform: rename-spec-to-test: rename-spec-to-test-disabled', (t) => {
    t.noTransform('rename-spec-to-test-disabled');
    t.end();
});

test('plugin-filesystem: no transform: rename-test-to-spec: rename-test-to-spec-disabled', (t) => {
    t.noTransform('rename-test-to-spec-disabled');
    t.end();
});

test('plugin-filesystem: no transform: rename-referenced-file: rename-referenced-file-disabled', (t) => {
    t.noTransform('rename-referenced-file-disabled');
    t.end();
});

test('plugin-filesystem: no transform: move-referenced-file: move-referenced-file-disabled', (t) => {
    t.noTransform('move-referenced-file-disabled');
    t.end();
});

test('plugin-filesystem: no transform: remove-files: remove-files-disabled', (t) => {
    t.noTransform('remove-files-disabled');
    t.end();
});

test('plugin-filesystem: no transform: convert-simple-filesystem-to-filesystem: convert-simple-filesystem-to-filesystem-disabled', (t) => {
    t.noTransform('convert-simple-filesystem-to-filesystem-disabled');
    t.end();
});

test('plugin-filesystem: no transform: convert-filesystem-to-simple-filesystem: convert-filesystem-to-simple-filesystem-disabled', (t) => {
    t.noTransform('convert-filesystem-to-simple-filesystem-disabled');
    t.end();
});

test('plugin-filesystem: no transform: bundle-disabled', (t) => {
    t.noTransform('bundle-disabled');
    t.end();
});

test('plugin-filesystem: no transform: replace-cwd: replace-cwd-disabled', (t) => {
    t.noTransform('replace-cwd-disabled');
    t.end();
});

test('plugin-filesystem: no transform: read-all-files: read-all-files-disabled', (t) => {
    t.noTransform('read-all-files-disabled');
    t.end();
});

test('plugin-filesystem: no transform: write-all-files: write-all-files-disabled', (t) => {
    t.noTransform('write-all-files-disabled');
    t.end();
});

test('plugin-filesystem: no transform: convert-json-to-js: convert-json-to-js-disabled', (t) => {
    t.noTransform('convert-json-to-js-disabled');
    t.end();
});

test('plugin-filesystem: no transform: convert-js-to-json-disabled', (t) => {
    t.noTransform('convert-js-to-json-disabled');
    t.end();
});

test('plugin-filesystem: transform: remove-nyc-output-files', (t) => {
    t.transform('remove-nyc-output-files');
    t.end();
});

test('plugin-filesystem: transform: remove-travis-yml-file', (t) => {
    t.transform('remove-travis-yml-file');
    t.end();
});

test('plugin-filesystem: transform: remove-empty-directory', (t) => {
    t.transform('remove-empty-directory');
    t.end();
});
