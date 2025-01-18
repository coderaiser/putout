'use strict';

const {createTest} = require('@putout/test');
const convertTopLevelReturn = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['convert-top-level-return', convertTopLevelReturn],
    ],
});

test('plugin-convert-top-level-return: report: return', (t) => {
    t.report('return', '"process.exit" should be used instead of top-level return');
    t.end();
});

test('plugin-convert-top-level-return: transform: return', (t) => {
    t.transform('return');
    t.end();
});

test('plugin-convert-top-level-return: transform: if', (t) => {
    t.transform('if');
    t.end();
});

test('plugin-convert-top-level-return: transform: return-arg', (t) => {
    t.transform('return-arg');
    t.end();
});

test('plugin-convert-top-level-return: no transform: fn', (t) => {
    t.noTransform('fn');
    t.end();
});
