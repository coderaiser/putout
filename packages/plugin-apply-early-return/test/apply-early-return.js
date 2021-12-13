'use strict';

const {createTest} = require('@putout/test');
const applyEarlyReturn = require('..');

const test = createTest(__dirname, {
    'apply-early-return': applyEarlyReturn,
});

test('plugin-apply-early-return: transform: report', (t) => {
    t.report('else', 'Apply early return');
    t.end();
});

test('plugin-apply-early-return: transform: else', (t) => {
    t.transform('else');
    t.end();
});

test('plugin-apply-early-return: transform: else-if', (t) => {
    t.transform('else-if');
    t.end();
});

test('plugin-apply-early-return: transform: return', (t) => {
    t.transform('return');
    t.end();
});

test('plugin-apply-early-return: no transform: no-return', (t) => {
    t.noTransform('no-return');
    t.end();
});

