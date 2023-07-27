'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['tape/apply-insert-after', convert],
    ],
});

test('plugin-tape: apply-insert-after: report', (t) => {
    t.report('apply-insert-after', `Use 'insertAfter(a, b)' instead of 'a.insertAfter(b)'`);
    t.end();
});

test('plugin-tape: apply-insert-after', (t) => {
    t.transform('apply-insert-after');
    t.end();
});
