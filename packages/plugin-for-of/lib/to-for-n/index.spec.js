'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['to-for-n', plugin],
    ],
});

test('for-of: to-for-n: report', (t) => {
    t.report('to-for-n', `Use 'for' instead of 'for...of' with '.entries()' when change index`);
    t.end();
});

test('for-of: to-for-n: transform', (t) => {
    t.transform('to-for-n');
    t.end();
});
