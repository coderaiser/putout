'use strict';

const {createTest} = require('@putout/test');
const removeSkip = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['tape/remove-skip', removeSkip],
    ],
});

test('plugin-remove-skip: report', (t) => {
    t.report('skip', 'Remove "test.skip"');
    t.end();
});

test('plugin-remove-skip: transform', (t) => {
    t.transform('skip');
    t.end();
});

test('plugin-remove-skip: transform: options', (t) => {
    t.transform('options');
    t.end();
});

test('plugin-remove-skip: transform: not top level', (t) => {
    t.transform('not-top-level');
    t.end();
});
