'use strict';

const {createTest} = require('@putout/test');
const convertDeepEqualToEqual = require('.');

const test = createTest(__dirname, {
    'tape/convert-deep-equal-to-equal': convertDeepEqualToEqual,
});

test('plugin-tape: convert-deep-equal-to-equal: report', (t) => {
    t.report('deep-equal', `Use 't.equal(x, 5)' instead of 't.deepEqual(x, 5)' when comparing with primitive`);
    t.end();
});

test('plugin-tape: convert-deep-equal-to-equal: transform', (t) => {
    t.transform('deep-equal');
    t.end();
});

test('plugin-tape: convert-deep-equal-to-equal: no transform: regexp', (t) => {
    t.noTransform('regexp');
    t.end();
});

test('plugin-tape: convert-deep-equal-to-equal: transform: string', (t) => {
    t.transform('string');
    t.end();
});

test('plugin-tape: convert-deep-equal-to-equal: transform: number', (t) => {
    t.transform('number');
    t.end();
});

test('plugin-tape: convert-deep-equal-to-equal: transform: null', (t) => {
    t.transform('null');
    t.end();
});

test('plugin-tape: convert-deep-equal-to-equal: transform: bool', (t) => {
    t.transform('bool');
    t.end();
});

test('plugin-tape: convert-deep-equal-to-equal: no transform: expected', (t) => {
    t.noTransform('expected');
    t.end();
});

