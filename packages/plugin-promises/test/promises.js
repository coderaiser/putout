'use strict';

const {createTest} = require('@putout/test');
const promises = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['promises', promises],
    ],
});

test('plugin-promises: report', (t) => {
    t.report('await', `Call async functions using 'await'`);
    t.end();
});

test('plugin-promises: transform: export', (t) => {
    t.transform('await');
    t.end();
});

test('plugin-promises: transform: add missing await', (t) => {
    t.transform('async');
    t.end();
});

test('plugin-promises: transform: add-missing-async', (t) => {
    t.transform('add-missing-async');
    t.end();
});

test('plugin-promises: transform: return-useless-async', (t) => {
    t.transform('remove-useless-async');
    t.end();
});

test('plugin-promises: transform: return-useless-await', (t) => {
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
