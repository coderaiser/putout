'use strict';

const {createTest} = require('@putout/test');
const optimize = require('.');

const test = createTest(__dirname, {
    'regexp/apply-ends-with': optimize,
});

test('plugin-regexp/apply-ends-with: report', (t) => {
    t.report('apply-ends-with', `Use '.endsWith()' instead of '.test()'`);
    t.end();
});

test('plugin-regexp/apply-ends-with: transform', (t) => {
    t.transform('apply-ends-with');
    t.end();
});

test('plugin-regexp/apply-ends-with: transform: slash', (t) => {
    t.transform('slash');
    t.end();
});

