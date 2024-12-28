'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['apply-esm', plugin],
    ],
});

test('putout-config: apply-esm: report', (t) => {
    t.report('apply-esm', `Rename property: 'convert-assert-to-with' -> 'esm/convert-assert-to-with'`);
    t.end();
});

test('putout-config: apply-esm: transform', (t) => {
    t.transform('apply-esm');
    t.end();
});
