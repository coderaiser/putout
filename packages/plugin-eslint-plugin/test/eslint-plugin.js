'use strict';

const {createTest} = require('@putout/test');
const eslintPlugin = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
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
