'use strict';

const {createTest} = require('@putout/test');
const tryCatch = require('.');

const test = createTest(__dirname, {
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

test('plugin-apply-try-catch: try-catch: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('plugin-apply-try-catch: try-catch: transform: no-error', (t) => {
    t.transform('no-error');
    t.end();
});

test('plugin-apply-try-catch: try-catch: no transform: no-call', (t) => {
    t.noTransform('no-call');
    t.end();
});

test('plugin-apply-try-catch: try-catch: no transform: finally', (t) => {
    t.noTransform('finally');
    t.end();
});

