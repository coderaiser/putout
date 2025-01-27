'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['is-jsx', plugin],
    ],
});

test('rename-js-to-jsx: is-jsx: report', (t) => {
    t.report('is-jsx', ``);
    t.end();
});

test('rename-js-to-jsx: is-jsx: no transform', (t) => {
    t.noTransform('is-jsx');
    t.end();
});
