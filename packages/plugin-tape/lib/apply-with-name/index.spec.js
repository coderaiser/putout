'use strict';

const {createTest} = require('@putout/test');
const applyWithName = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['tape/apply-with-name', applyWithName],
    ],
});

test('plugin-tape: apply-with-name: report: called-before', (t) => {
    t.report('called-before', `'stub().withName()' should be used`);
    t.end();
});

test('plugin-tape: apply-with-name: transform: called-before', (t) => {
    t.transform('called-before');
    t.end();
});

test('plugin-tape: apply-with-name: transform: called-after', (t) => {
    t.transform('called-after');
    t.end();
});

test('plugin-tape: apply-with-name: transform: called-in-order', (t) => {
    t.transform('called-in-order');
    t.end();
});

test('plugin-tape: apply-with-name: transform: not-declared', (t) => {
    t.transform('not-declared');
    t.end();
});

test('plugin-tape: apply-with-name: transform: chain', (t) => {
    t.transform('chain');
    t.end();
});

test('plugin-tape: apply-with-name: no report after transform: chain', (t) => {
    t.noReportAfterTransform('chain');
    t.end();
});
