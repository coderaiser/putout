'use strict';

const {createTest} = require('@putout/test');
const declare = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['eslint/declare', declare],
    ],
});

test('plugin-eslint: declare: report: safe-align', (t) => {
    t.report('safe-align', `Declare 'safeAlign', it referenced but not defined`);
    t.end();
});

test('plugin-eslint: declare: transform: safe-align', (t) => {
    t.transform('safe-align');
    t.end();
});

test('plugin-eslint: declare: transform: eslint-flat', (t) => {
    t.transform('eslint-flat');
    t.end();
});

test('plugin-eslint: declare: no transform: config-helpers', (t) => {
    t.noTransform('config-helpers');
    t.end();
});
