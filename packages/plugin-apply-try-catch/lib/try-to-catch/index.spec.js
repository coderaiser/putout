'use strict';

const {createTest} = require('@putout/test');
const tryToCatch = require('.');

const test = createTest(__dirname, {
    'try-to-catch': tryToCatch,
});

test('plugin-apply-try-catch: try-to-catch: transform: report', (t) => {
    t.report('try-to-catch', 'Use await tryToCatch instead of try-to-catch block');
    t.end();
});

test('plugin-apply-try-catch: try-to-catch: transform: try-to-catch', (t) => {
    t.transform('try-to-catch');
    t.end();
});

test('plugin-apply-try-catch: try-to-catch: no transform: no-error', (t) => {
    t.noTransform('no-error');
    t.end();
});

