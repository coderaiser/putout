'use strict';

const {createTest} = require('@putout/test');
const falsy = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['apply-array-destructuring/falsy', falsy],
    ],
});

test('plugin-apply-destructuring: falsy: report: assignment', (t) => {
    t.report('falsy', `Use destructuring instead of setting 'maxElementsInOneLine' to 'undefined'`);
    t.end();
});

test('plugin-apply-destructuring: falsy: transform: array: variable-declarator', (t) => {
    t.transform('falsy');
    t.end();
});
