'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['optional-chaining/convert-optional-to-logical', plugin],
    ],
});

test('packages: optional-chaining: convert-optional-to-logical: call: no report: assign', (t) => {
    t.noReport('assign');
    t.end();
});

test('packages: optional-chaining: convert-optional-to-logical: call: transform: not', (t) => {
    t.transform('not');
    t.end();
});

test('packages: optional-chaining: convert-optional-to-logical: call: transform: squire', (t) => {
    t.transform('squire');
    t.end();
});
