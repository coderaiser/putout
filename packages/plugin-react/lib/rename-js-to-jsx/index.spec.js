'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['rename-js-to-jsx', plugin],
    ],
});

test('react: rename-js-to-jsx: report', (t) => {
    t.report('rename-js-to-jsx', ``);
    t.end();
});

test('react: rename-js-to-jsx: transform', (t) => {
    t.transform('rename-js-to-jsx');
    t.end();
});
