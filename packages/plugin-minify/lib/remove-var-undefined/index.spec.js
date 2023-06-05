'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-var-undefined', plugin],
    ],
});

test('plugin-minify: remove-var-undefined: report', (t) => {
    t.report('remove-var-undefined', `Avoid using 'undefined' in variable declaration`);
    t.end();
});

test('plugin-minify: remove-var-undefined: transform', (t) => {
    t.transform('remove-var-undefined');
    t.end();
});
