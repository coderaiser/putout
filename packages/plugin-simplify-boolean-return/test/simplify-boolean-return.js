'use strict';

const {createTest} = require('@putout/test');
const removeUnusedVariables = require('@putout/plugin-remove-unused-variables');
const simplifyTernary = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['simplify-boolean-return', simplifyTernary],
    ],
});

test('plugin-simplify-boolean-return: report', (t) => {
    t.report('simplify-boolean-return', 'Simplify boolean return');
    t.end();
});

test('plugin-simplify-boolean-return: transform: callstack', (t) => {
    t.transform('callstack', {
        removeUnusedVariables,
    });
    t.end();
});

test('plugin-simplify-boolean-return: transform', (t) => {
    t.transform('simplify-boolean-return');
    t.end();
});

test('plugin-simplify-boolean-return: transform: not', (t) => {
    t.transform('not');
    t.end();
});
