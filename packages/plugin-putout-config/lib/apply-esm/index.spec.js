'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['apply-esm', plugin],
    ],
});

test('putout-config: apply-esm: report', (t) => {
    t.report('apply-esm', `Rename property: 'remove-empty/import' -> 'esm/remove-empty-import'`);
    t.end();
});

test('putout-config: apply-esm: transform', (t) => {
    t.transform('apply-esm');
    t.end();
});
