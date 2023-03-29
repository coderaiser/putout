'use strict';

const {createTest} = require('@putout/test');
const applyOptionalChaining = require('..');

const test = createTest(__dirname, {
    'apply-optional-chaining': applyOptionalChaining,
});

test('plugin-apply-optional-chaining: transform: report', (t) => {
    t.report('chain', 'Use optional chaining');
    t.end();
});

test('plugin-apply-optional-chaining: transform', (t) => {
    t.transform('chain');
    t.end();
});

test('plugin-apply-optional-chaining: transform: simple', (t) => {
    t.transform('simple');
    t.end();
});

test('plugin-apply-optional-chaining: transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

test('plugin-apply-optional-chaining: transform: fn if', (t) => {
    t.transform('fn-if');
    t.end();
});

test('plugin-apply-optional-chaining: transform: computed', (t) => {
    t.transform('computed');
    t.end();
});

test('plugin-apply-optional-chaining: no transform: continue', (t) => {
    t.noTransform('continue');
    t.end();
});

test('plugin-apply-optional-chaining: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('plugin-apply-optional-chaining: transform: nested', (t) => {
    t.transform('nested');
    t.end();
});

test('plugin-apply-optional-chaining: transform: call-expression', (t) => {
    t.transform('call-expression');
    t.end();
});

