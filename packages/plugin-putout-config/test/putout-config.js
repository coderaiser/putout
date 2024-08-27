'use strict';

const {createTest} = require('@putout/test');
const putoutConfig = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['putout-config', putoutConfig],
    ],
});

test('plugin-putout-config: transform: apply-labels', (t) => {
    t.transform('apply-labels');
    t.end();
});

test('plugin-putout-config: transform: apply-nodejs', (t) => {
    t.transform('apply-nodejs');
    t.end();
});

test('plugin-putout-config: transform: apply-tape', (t) => {
    t.transform('apply-tape');
    t.end();
});

test('plugin-putout-config: transform: convert-boolean-to-string', (t) => {
    t.transform('convert-boolean-to-string');
    t.end();
});

test('plugin-putout-config: transform: remove-empty', (t) => {
    t.transform('remove-empty');
    t.end();
});

test('plugin-putout-config: transform: move-formatter-up', (t) => {
    t.transform('move-formatter-up');
    t.end();
});
