'use strict';

const {createTest} = require('@putout/test');
const convertEqualToStrictEqual = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['conditions/convert-equal-to-strict-equal', convertEqualToStrictEqual],
    ],
});

test('plugin-conditions: convert-equal-to-strict-equal: report', (t) => {
    t.report('equal', `Use strict equal ('===') instead of equal ('==')`);
    t.end();
});

test('plugin-conditions: convert-equal-to-strict-equal: transform', (t) => {
    t.transform('equal');
    t.end();
});

test('plugin-conditions: convert-equal-to-strict-equal: no transform: null', (t) => {
    t.noTransform('null');
    t.end();
});

test('plugin-conditions: convert-equal-to-strict-equal: no transform: not-null', (t) => {
    t.noTransform('not-null');
    t.end();
});
