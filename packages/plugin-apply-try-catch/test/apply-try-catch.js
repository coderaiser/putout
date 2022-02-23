'use strict';

const {createTest} = require('@putout/test');
const tryCatch = require('..');

const test = createTest(__dirname, {
    'try-catch': tryCatch,
});

test('plugin-apply-try-catch: transform: report', (t) => {
    t.report('try-catch', 'Use tryCatch instead of try-catch block');
    t.end();
});

test('plugin-apply-try-catch: transform: try-catch', (t) => {
    t.transform('try-catch');
    t.end();
});

test('plugin-apply-try-catch: transform: await', (t) => {
    t.transform('await');
    t.end();
});

test('plugin-apply-try-catch: transform: args', (t) => {
    t.transform('args');
    t.end();
});

