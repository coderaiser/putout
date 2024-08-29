'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['apply-types', plugin],
    ],
});

test('putout-config: apply-types: report', (t) => {
    t.report('apply-types', `Rename property: 'convert-typeof-to-is-type' -> 'types/convert-typeof-to-is-type'`);
    t.end();
});

test('putout-config: apply-types: transform', (t) => {
    t.transform('apply-types');
    t.end();
});
