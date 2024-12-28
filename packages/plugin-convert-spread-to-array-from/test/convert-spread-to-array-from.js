'use strict';

const {createTest} = require('@putout/test');
const convertSpreadToArrayFrom = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['convert-spread-to-array-from', convertSpreadToArrayFrom],
    ],
});

test('plugin-convert-spread-to-array-from: report', (t) => {
    t.report('spread', `Array.from should be used instead of array spread`);
    t.end();
});

test('plugin-convert-spread-to-array-from: transform', (t) => {
    t.transform('spread');
    t.end();
});

test('plugin-convert-spread-to-array-from: no transform: elements', (t) => {
    t.noTransform('elements');
    t.end();
});
