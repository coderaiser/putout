'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['convert-json-to-js', plugin],
    ],
});

test('eslint: convert-json-to-js: report', (t) => {
    t.reportWithOptions('convert-json-to-js', `Convert '*.json' to '*.js'`, {
        filename: 'package.json',
    });
    t.end();
});

test('eslint: convert-json-to-js: transform', (t) => {
    t.transformWithOptions('convert-json-to-js', {
        filename: 'package.json',
    });
    t.end();
});
