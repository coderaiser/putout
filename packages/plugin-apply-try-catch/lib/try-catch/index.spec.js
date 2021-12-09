'use strict';

const tryCatch = require('.');

const test = require('@putout/test')(__dirname, {
    'try-catch': tryCatch,
});

test('plugin-apply-try-catch: try-catch: transform: report', (t) => {
    t.report('try-catch', 'Use tryCatch instead of try-catch block');
    t.end();
});

test('plugin-apply-try-catch: try-catch: transform: try-catch', (t) => {
    t.transform('try-catch');
    t.end();
});

test('plugin-apply-try-catch: try-catch: no transform: no-error', (t) => {
    t.noTransform('no-error');
    t.end();
});

