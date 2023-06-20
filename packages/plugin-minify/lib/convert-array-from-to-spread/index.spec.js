'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-array-from-to-spread', plugin],
    ],
});

test('plugin-minify: convert-array-from-to-spread: report', (t) => {
    t.report('convert-array-from-to-spread', `Use 'spread' instead of 'Array.from()'`);
    t.end();
});

test('plugin-minify: convert-array-from-to-spread: transform', (t) => {
    t.transform('convert-array-from-to-spread');
    t.end();
});
