'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['putout-config/apply-for-of', plugin],
    ],
});

test('putout-config: apply-for-of: report', (t) => {
    t.report('apply-for-of', `Rename property: 'convert-for-to-for-of' -> 'for-of/for'`);
    t.end();
});

test('putout-config: apply-for-of: transform', (t) => {
    t.transform('apply-for-of');
    t.end();
});
