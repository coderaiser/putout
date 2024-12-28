'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-unchanged-zero-declarations', plugin],
    ],
});

test('math: remove-unchanged-zero-declarations: report', (t) => {
    t.report('remove-unchanged-zero-declarations', 'Avoid unchanged zero declarations');
    t.end();
});

test('math: remove-unchanged-zero-declarations: transform', (t) => {
    t.transform('remove-unchanged-zero-declarations');
    t.end();
});

test('math: remove-unchanged-zero-declarations: no report: no-init', (t) => {
    t.noReport('no-init');
    t.end();
});

test('math: remove-unchanged-zero-declarations: no report: exported', (t) => {
    t.noReport('exported');
    t.end();
});
