'use strict';

const {createTest} = require('@putout/test');
const optimize = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['regexp/apply-ends-with', optimize],
    ],
});

test('plugin-regexp/apply-ends-with: report: apply-ends-with', (t) => {
    t.report('apply-ends-with', `Use '.endsWith()' instead of '.test()'`);
    t.end();
});

test('plugin-regexp/apply-ends-with: transform: apply-ends-with', (t) => {
    t.transform('apply-ends-with');
    t.end();
});

test('plugin-regexp/apply-ends-with: transform: slash', (t) => {
    t.transform('slash');
    t.end();
});

test('plugin-regexp/apply-ends-with: no report: escape', (t) => {
    t.noReport('escape');
    t.end();
});
