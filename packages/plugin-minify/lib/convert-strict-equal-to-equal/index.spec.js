'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-strict-equal-to-equal', plugin],
    ],
});

test('plugin-minify: convert-strict-equal-to-equal: report', (t) => {
    t.report('convert-strict-equal-to-equal', `Use 'equal' instead of 'strict equal'`);
    t.end();
});

test('plugin-minify: convert-strict-equal-to-equal: transform', (t) => {
    t.transform('convert-strict-equal-to-equal');
    t.end();
});
