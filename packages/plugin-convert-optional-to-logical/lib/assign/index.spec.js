'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-optional-to-logical/assign', plugin],
    ],
});

test('packages: convert-optional-to-logical: assign: report', (t) => {
    t.report('assign', `Invalid left-hand side in assignment`);
    t.end();
});

test('packages: convert-optional-to-logical: assign: transform', (t) => {
    t.transform('assign');
    t.end();
});
