'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-optional-to-logical/call', plugin],
    ],
});

test('packages: convert-optional-to-logical: call: no report', (t) => {
    t.noReport('assign');
    t.end();
});

test('packages: convert-optional-to-logical: call: transform: not', (t) => {
    t.transform('not');
    t.end();
});
