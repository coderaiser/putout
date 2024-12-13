'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['apply-optional-chaining', plugin],
    ],
});

test('putout-config: apply-optional-chaining: report', (t) => {
    t.report('apply-optional-chaining', `Rename property: 'convert-optional-to-logical/assign' -> 'optional-chaining/convert-optional-assign-to-logical'`);
    t.end();
});

test('putout-config: apply-optional-chaining: transform', (t) => {
    t.transform('apply-optional-chaining');
    t.end();
});
