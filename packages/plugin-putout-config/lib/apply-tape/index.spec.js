'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['apply-tape', plugin],
    ],
});

test('putout-config: apply-tape: report', (t) => {
    t.report('apply-tape', `Rename property: 'convert-mock-require-to-mock-import' -> 'tape/convert-mock-require-to-mock-import'`);
    t.end();
});

test('putout-config: apply-tape: transform', (t) => {
    t.transform('apply-tape');
    t.end();
});

