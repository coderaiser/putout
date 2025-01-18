'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['convert-assert-to-with', plugin],
    ],
});

test('plugin-convert-assert-to-with: report: convert-assert-to-with', (t) => {
    t.report('convert-assert-to-with', `Use 'with' instead of 'assert'`);
    t.end();
});

test('plugin-convert-assert-to-with: transform: convert-assert-to-with', (t) => {
    t.transform('convert-assert-to-with');
    t.end();
});
