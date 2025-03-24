'use strict';

const {createTest} = require('@putout/test');
const convertToArrowFunction = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['assignment/convert-to-arrow-function', convertToArrowFunction],
    ],
});

test('plugin-assignment-convert-to-arrow-function: report: assignment', (t) => {
    t.report('assignment', 'Expected ArrowFunction instead of Assignment');
    t.end();
});

test('plugin-assignment-convert-to-arrow-function: transform: assignment', (t) => {
    t.transform('assignment');
    t.end();
});

test('plugin-assignment: convert-to-arrow-function: no transform: variable', (t) => {
    t.noTransform('variable');
    t.end();
});

test('plugin-assignment: convert-to-arrow-function: no transform: member-expression', (t) => {
    t.noTransform('member-expression');
    t.end();
});
