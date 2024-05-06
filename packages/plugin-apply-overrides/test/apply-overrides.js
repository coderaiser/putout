'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['apply-overrides', plugin],
    ],
});

test('putout: apply-overrides: report', (t) => {
    t.report('apply-overrides', `Use variable 'overrides' instead of destructuring function argument`);
    t.end();
});

test('putout: apply-overrides: no report: no-overrides', (t) => {
    t.noReport('no-overrides');
    t.end();
});

test('putout: apply-overrides: no report: declared', (t) => {
    t.noReport('declared');
    t.end();
});

test('putout: apply-overrides: no report: no-args', (t) => {
    t.noReport('no-args');
    t.end();
});

test('putout: apply-overrides: transform: one-arg', (t) => {
    t.transform('one-arg');
    t.end();
});

test('putout: apply-overrides: no report: two-args', (t) => {
    t.noReport('two-args');
    t.end();
});

test('putout: apply-overrides: no report: not-destr', (t) => {
    t.noReport('not-destr');
    t.end();
});

test('putout: apply-overrides: no report: not-idenfier', (t) => {
    t.noReport('not-identifier');
    t.end();
});

test('putout: apply-overrides: transform', (t) => {
    t.transform('apply-overrides');
    t.end();
});
