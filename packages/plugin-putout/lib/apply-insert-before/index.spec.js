'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['tape/apply-insert-before', convert],
    ],
});

test('plugin-tape: apply-insert-before: report', (t) => {
    t.report('apply-insert-before', `Use 'insertBefore(a, b)' instead of 'a.insertBefore(b)'`);
    t.end();
});

test('plugin-tape: apply-insert-before', (t) => {
    t.transform('apply-insert-before');
    t.end();
});
