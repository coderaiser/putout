'use strict';

const {createTest} = require('@putout/test');
const optimize = require('.');

const test = createTest(__dirname, {
    'regexp/apply-starts-with': optimize,
});

test('plugin-regexp/apply-starts-with: report', (t) => {
    t.report('apply-starts-with', `Use '.startsWith()' instead of '.test()'`);
    t.end();
});

test('plugin-regexp/apply-starts-with: transform', (t) => {
    t.transform('apply-starts-with');
    t.end();
});

test('plugin-regexp/apply-starts-with: transform: slash', (t) => {
    t.transform('slash');
    t.end();
});

