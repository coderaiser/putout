'use strict';

const {createTest} = require('@putout/test');

const plugin = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['merge-duplicate-functions', plugin],
    ],
});

test('merge duplicate functions: report: merge-duplicate-functions', (t) => {
    t.report('merge-duplicate-functions', 'Avoid duplicate functions');
    t.end();
});

test('merge duplicate functions: transform: merge-duplicate-functions', (t) => {
    t.transform('merge-duplicate-functions');
    t.end();
});

test('merge duplicate functions: no transform: not-var', (t) => {
    t.noTransform('not-var');
    t.end();
});

test('merge duplicate functions: no transform: different-type', (t) => {
    t.noTransform('different-type');
    t.end();
});

test('merge duplicate functions: no transform: not-fn', (t) => {
    t.noTransform('not-fn');
    t.end();
});

test('merge duplicate functions: no transform: different', (t) => {
    t.noTransform('different');
    t.end();
});
