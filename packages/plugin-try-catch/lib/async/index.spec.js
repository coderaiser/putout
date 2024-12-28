'use strict';

const {createTest} = require('@putout/test');
const tryToCatch = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['try-to-catch', tryToCatch],
    ],
});

test('plugin-try-catch: async: report', (t) => {
    t.report('try-to-catch', `Use 'await tryToCatch()' instead of 'await' in 'try-catch' block`);
    t.end();
});

test('plugin-try-catch: async: transform: try-to-catch', (t) => {
    t.transform('try-to-catch');
    t.end();
});

test('plugin-try-catch: async: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('plugin-try-catch: async: transform: no-error', (t) => {
    t.transform('no-error');
    t.end();
});

test('plugin-try-catch: async: no report: no-await', (t) => {
    t.noReport('no-await');
    t.end();
});

test('plugin-try-catch: async: no report: finalizer', (t) => {
    t.noReport('finalizer');
    t.end();
});
