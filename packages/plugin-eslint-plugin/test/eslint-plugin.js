'use strict';

const {createTest} = require('@putout/test');
const eslintPlugin = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['eslint-plugin', eslintPlugin],
    ],
});

test('putout: plugin-eslint: transform: apply-source-code', (t) => {
    t.transform('apply-source-code');
    t.end();
});

test('putout: plugin-eslint: transform: apply-filename', (t) => {
    t.transform('apply-filename');
    t.end();
});

test('plugin-eslint-plugin: transform: convert-context-to-source', (t) => {
    t.transform('convert-context-to-source');
    t.end();
});

test('plugin-eslint-plugin: transform: apply-flat-config-to-rule-tester', (t) => {
    t.transform('apply-flat-config-to-rule-tester');
    t.end();
});

test('plugin-eslint-plugin: transform: convert-require-resolve-to-require', (t) => {
    t.transform('convert-require-resolve-to-require');
    t.end();
});

test('plugin-eslint-plugin: transform: turn-off-schema', (t) => {
    t.transform('turn-off-schema');
    t.end();
});

test('plugin-eslint-plugin: transform: update-ecma-version', (t) => {
    t.transform('update-ecma-version');
    t.end();
});
