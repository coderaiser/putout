'use strict';

const {createTest} = require('@putout/test');
const declare = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['apply-try-catch/declare', declare],
    ],
});

test('plugin-apply-try-catch: declare: report: try-catch', (t) => {
    t.report('try-catch', `Declare 'tryCatch', it referenced but not defined`);
    t.end();
});

test('plugin-apply-try-catch: declare: transform: try-catch', (t) => {
    t.transform('try-catch');
    t.end();
});

test('plugin-apply-try-catch: declare: transform: try-to-catch', (t) => {
    t.transform('try-to-catch');
    t.end();
});
