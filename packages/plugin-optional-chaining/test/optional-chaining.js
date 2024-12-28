'use strict';

const {createTest} = require('@putout/test');
const optionalChaining = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['optional-chaining', optionalChaining],
    ],
});

test('plugin-optional-chaining: report', (t) => {
    t.report('chain', 'Use optional chaining');
    t.end();
});

test('plugin-optional-chaining: transform', (t) => {
    t.transform('chain');
    t.end();
});

test('plugin-optional-chaining: transform: simple', (t) => {
    t.transform('simple');
    t.end();
});

test('plugin-optional-chaining: transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

test('plugin-optional-chaining: transform: fn if', (t) => {
    t.transform('fn-if');
    t.end();
});

test('plugin-optional-chaining: transform: computed', (t) => {
    t.transform('computed');
    t.end();
});

test('plugin-optional-chaining: no transform: continue', (t) => {
    t.noTransform('continue');
    t.end();
});

test('plugin-optional-chaining: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('plugin-optional-chaining: transform: nested', (t) => {
    t.transform('nested');
    t.end();
});

test('plugin-optional-chaining: transform: property', (t) => {
    t.transform('property');
    t.end();
});

test('plugin-optional-chaining: transform: call-expression', (t) => {
    t.transform('call-expression');
    t.end();
});

test('plugin-optional-chaining: no transform: assign', (t) => {
    t.noTransform('assign');
    t.end();
});

test('plugin-optional-chaining: transform: convert-optional-assign-to-logical', (t) => {
    t.transform('convert-optional-assign-to-logical');
    t.end();
});
