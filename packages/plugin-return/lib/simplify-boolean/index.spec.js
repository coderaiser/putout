'use strict';

const {createTest} = require('@putout/test');
const removeUnusedVariables = require('@putout/plugin-remove-unused-variables');
const simplifyBoolean = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['simplify-boolean', simplifyBoolean],
    ],
});

test('plugin-simplify-boolean: report: simplify-boolean', (t) => {
    t.report('simplify-boolean', 'Simplify boolean return');
    t.end();
});

test('plugin-simplify-boolean: transform: callstack', (t) => {
    t.transform('callstack', {
        removeUnusedVariables,
    });
    t.end();
});

test('plugin-simplify-boolean: transform: simplify-boolean', (t) => {
    t.transform('simplify-boolean');
    t.end();
});

test('plugin-simplify-boolean: transform: not', (t) => {
    t.transform('not');
    t.end();
});
