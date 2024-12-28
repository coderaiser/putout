'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['convert-exports-to-module-exports', plugin],
    ],
});

test('packages: convert-exports-to-module-exports: report', (t) => {
    t.report('convert-exports-to-module-exports', `Use 'module.exports' instead of 'exports'`);
    t.end();
});

test('packages: convert-exports-to-module-exports: transform', (t) => {
    t.transform('convert-exports-to-module-exports');
    t.end();
});
