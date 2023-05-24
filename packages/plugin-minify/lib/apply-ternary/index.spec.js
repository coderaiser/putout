'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['apply-ternary', plugin],
    ],
});

test('plugin-minify: apply-ternary: report', (t) => {
    t.report('apply-ternary', `Use 'ternary' instead of 'if condition'`);
    t.end();
});

test('plugin-minify: apply-ternary: transform', (t) => {
    t.transform('apply-ternary');
    t.end();
});
