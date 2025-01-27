'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['rename-file-js-to-jsx', plugin],
    ],
});

test('react: rename-file-js-to-jsx: report', (t) => {
    t.report('rename-file-js-to-jsx', ``);
    t.end();
});

test('react: rename-file-js-to-jsx: transform', (t) => {
    t.transform('rename-file-js-to-jsx');
    t.end();
});
