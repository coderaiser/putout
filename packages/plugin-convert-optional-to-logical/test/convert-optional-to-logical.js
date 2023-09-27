'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-optional-to-logical', plugin],
    ],
});

test('plugin-for-of: transform: convert-optional-to-logical: report', (t) => {
    t.report('convert-optional-to-logical', 'Use Logical Expression instead of Optional Chaining');
    t.end();
});

test('plugin-for-of: transform: convert-optional-to-logical', (t) => {
    t.transform('convert-optional-to-logical');
    t.end();
});

test('plugin-for-of: transform: convert-optional-to-logical: squire', (t) => {
    t.transform('squire');
    t.end();
});

test('plugin-convert-optional-to-logical: transform: assign', (t) => {
    t.transform('assign');
    t.end();
});
