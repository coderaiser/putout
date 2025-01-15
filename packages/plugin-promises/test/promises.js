'use strict';

const {createTest} = require('@putout/test');
const promises = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['promises', promises],
    ],
});

test('plugin-promises: report: await', (t) => {
    t.report('await', `Call async functions using 'await'`);
    t.end();
});

test('plugin-promises: transform: await', (t) => {
    t.transform('await');
    t.end();
});

test('plugin-promises: transform: async', (t) => {
    t.transform('async');
    t.end();
});

test('plugin-promises: transform: add-missing-async', (t) => {
    t.transform('add-missing-async');
    t.end();
});

test('plugin-promises: transform: remove-useless-async', (t) => {
    t.transform('remove-useless-async');
    t.end();
});

test('plugin-promises: transform: remove-useless-await', (t) => {
    t.transform('remove-useless-await');
    t.end();
});

test('plugin-promises: transform: apply-top-level-await', (t) => {
    t.transform('apply-top-level-await');
    t.end();
});

test('plugin-promises: transform: apply-await-import', (t) => {
    t.transform('apply-await-import');
    t.end();
});

test('plugin-promises: transform: convert-new-promise-to-async', (t) => {
    t.transform('convert-new-promise-to-async');
    t.end();
});

test('plugin-promises: transform: remove-useless-variables', (t) => {
    t.transform('remove-useless-variables');
    t.end();
});

test('plugin-promises: transform: apply-with-resolvers', (t) => {
    t.transform('apply-with-resolvers');
    t.end();
});
