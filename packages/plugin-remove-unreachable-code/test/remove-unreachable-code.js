'use strict';

const {createTest} = require('@putout/test');
const removeUnreachableCode = require('..');

const test = createTest(__dirname, {
    'remove-unreachable-code': removeUnreachableCode,
});

test('plugin-remove-unreachable-code: report', (t) => {
    t.report('return', 'Unreachable code');
    t.end();
});

test('plugin-remove-unreachable-code: transform: return', (t) => {
    t.transform('return');
    t.end();
});

test('plugin-remove-unreachable-code: transform: throw', (t) => {
    t.transform('throw');
    t.end();
});

test('plugin-remove-unreachable-code: no transform: hoist', (t) => {
    t.noTransform('hoist');
    t.end();
});

