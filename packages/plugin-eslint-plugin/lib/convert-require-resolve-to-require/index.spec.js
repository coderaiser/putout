'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-require-resolve-to-require', plugin],
    ],
});

test('packages: convert-require-resolve-to-require: report', (t) => {
    t.report('convert-require-resolve-to-require', `Convert 'require.resolve()' to 'require()'`);
    t.end();
});

test('packages: convert-require-resolve-to-require: no report', (t) => {
    t.noReport('not-property');
    t.end();
});

test('packages: convert-require-resolve-to-require: transform', (t) => {
    t.transform('convert-require-resolve-to-require');
    t.end();
});
