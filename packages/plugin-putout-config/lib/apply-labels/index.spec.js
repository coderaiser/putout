'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['apply-labels', plugin],
    ],
});

test('putout-config: apply-labels: report', (t) => {
    t.report('apply-labels', `Rename property: 'remove-unused-labels' -> 'labels/remove-unused'`);
    t.end();
});

test('putout-config: apply-labels: transform', (t) => {
    t.transform('apply-labels');
    t.end();
});

test('putout-config: apply-labels: transform: convert-label-to-object', (t) => {
    t.transform('convert-label-to-object');
    t.end();
});
