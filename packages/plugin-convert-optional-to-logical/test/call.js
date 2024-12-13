'use strict';

const {createTest} = require('@putout/test');
const convert = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    rules: {
        'convert-optional-to-logical/call': 'on',
    },
    plugins: [
        ['convert-optional-to-logical', convert],
    ],
});

test('plugin-convert-optional-to-logical: report: call', (t) => {
    t.report('call', 'Use Logical Expression instead of Optional Chaining');
    t.end();
});

test('plugin-convert-optional-to-logical: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('plugin-convert-optional-to-logical: transform: squire', (t) => {
    t.transform('squire');
    t.end();
});
