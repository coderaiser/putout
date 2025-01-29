'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['convert-from-continue', plugin],
    ],
});

test('return: convert-from-continue: report', (t) => {
    t.report('convert-from-continue', `Use 'return' instead of 'continue'`);
    t.end();
});

test('return: convert-from-continue: transform', (t) => {
    t.transform('convert-from-continue');
    t.end();
});
