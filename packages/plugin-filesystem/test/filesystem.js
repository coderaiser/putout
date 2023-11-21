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
