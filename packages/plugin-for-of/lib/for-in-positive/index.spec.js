'use strict';

const {createTest} = require('@putout/test');
const convertForInToForOf = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['convert-for-in-to-for-of', convertForInToForOf],
    ],
});

test('plugin-convert-for-in-to-for-of: positive: report', (t) => {
    t.report('for-in', 'for-of should be used instead of for-in');
    t.end();
});

test('plugin-convert-for-in-to-for-of: positive: transform', (t) => {
    t.transform('for-in');
    t.end();
});

test('plugin-convert-for-in-to-for-of: positive: no transform: no hasOwnProperty', (t) => {
    t.noTransform('no-has-own');
    t.end();
});

test('plugin-convert-for-in-to-for-of: positive: no transform: no var', (t) => {
    t.noTransform('no-var');
    t.end();
});
