'use strict';

const {createTest} = require('@putout/test');

const forOf = require('@putout/plugin-for-of');
const convertComparisonToBoolean = require('.');

const convertForEachToForOf = forOf.rules['for-each'];
const removeUselessVariables = forOf.rules['remove-useless-variables'];

const test = createTest(__dirname, {
    plugins: [
        ['conditions/convert-comparison-to-boolean', convertComparisonToBoolean],
    ],
});

test('plugin-conditions: convert-comparison-to-boolean: report', (t) => {
    t.report('binary', 'Avoid constant conditions');
    t.end();
});

test('plugin-conditions: convert-comparison-to-boolean: transform: positive', (t) => {
    t.transform('binary');
    t.end();
});

test('plugin-conditions: convert-comparison-to-boolean: no transform: add', (t) => {
    t.noTransform('add');
    t.end();
});

test('plugin-conditions: convert-comparison-to-boolean: no transform: compare', (t) => {
    t.noTransform('compare');
    t.end();
});

test('plugin-conditions: convert-comparison-to-boolean: no transform: literal left', (t) => {
    t.noTransform('literal-left');
    t.end();
});

test('plugin-conditions: convert-comparison-to-boolean: no transform: literal right', (t) => {
    t.noTransform('literal-right');
    t.end();
});

test('plugin-conditions: convert-comparison-to-boolean: transform: same', (t) => {
    t.transform('same');
    t.end();
});

test('plugin-conditions: convert-comparison-to-boolean: transform: compute', (t) => {
    t.transform('compute');
    t.end();
});

test('plugin-conditions: convert-comparison-to-boolean: no transform: bitwise', (t) => {
    t.noTransform('bitwise');
    t.end();
});

test('plugin-conditions: convert-comparison-to-boolean: no transform: member expression', (t) => {
    t.noTransform('member-expression');
    t.end();
});

test('plugin-conditions: convert-comparison-to-boolean: no transform: object', (t) => {
    t.noTransform('object');
    t.end();
});

test('plugin-conditions: convert-comparison-to-boolean: no transform: spread', (t) => {
    t.noTransform('spread');
    t.end();
});

test('plugin-conditions: convert-comparison-to-boolean: no transform: reassign', (t) => {
    t.noTransform('reassign');
    t.end();
});

test('plugin-conditions: convert-comparison-to-boolean: transform: with convert-for-each-to-for-of', (t) => {
    t.transform('convert-for-each-to-for-of', {
        'convert-for-each-to-for-of': convertForEachToForOf,
        'remove-useless-variables': removeUselessVariables,
    });
    t.end();
});
