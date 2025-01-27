'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['rename-file-jsx-to-js', plugin],
    ],
});

test('react: rename-file-jsx-to-js: report', (t) => {
    t.report('rename-file-jsx-to-js', ``);
    t.end();
});

test('react: rename-file-jsx-to-js: transform', (t) => {
    t.transform('rename-file-jsx-to-js');
    t.end();
});
