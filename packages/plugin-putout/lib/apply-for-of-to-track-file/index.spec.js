'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['apply-for-of-to-track-file', plugin],
    ],
});

test('packages: apply-for-of-to-track-file: report', (t) => {
    t.report('apply-for-of-to-track-file', `Use 'if condition' instead of 'ternary expression'`);
    t.end();
});

test('packages: apply-for-of-to-track-file: transform', (t) => {
    t.transform('apply-for-of-to-track-file');
    t.end();
});
