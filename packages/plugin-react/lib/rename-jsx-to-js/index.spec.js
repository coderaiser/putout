'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['rename-jsx-to-js', plugin],
    ],
});

test('react: rename-jsx-to-js: report', (t) => {
    t.report('rename-jsx-to-js', ``);
    t.end();
});

test('react: rename-jsx-to-js: transform', (t) => {
    t.transform('rename-jsx-to-js');
    t.end();
});
