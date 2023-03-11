'use strict';

const {createTest} = require('@putout/test');
const forN = require('.');

const test = createTest(__dirname, {
    'for-of/n': forN,
});

test('plugin-for-of: for-n: for-no report', (t) => {
    t.noReport('no-length');
    t.end();
});

test('plugin-for-of: for-n: for-no transform', (t) => {
    t.noTransform('no-length');
    t.end();
});

test('plugin-for-of: for-n: transform: used length', (t) => {
    t.transform('used-length');
    t.end();
});

test('plugin-for-of: for-n: for-no transform: more i references', (t) => {
    t.noTransform('for-more');
    t.end();
});

test('plugin-for-of: for-n: for-no transform: for-no-name', (t) => {
    t.noTransform('no-name');
    t.end();
});

test('plugin-for-of: for-n: transform: remove-useless-arguments', (t) => {
    t.transform('remove-useless-arguments', {
        'remove-unused-variables': require('@putout/plugin-remove-unused-variables'),
        'remove-useless-arguments': require('@putout/plugin-remove-useless-arguments'),
    });
    t.end();
});

test('plugin-for-of: for-n: for-no transform: xxx', (t) => {
    t.noTransform('for-to-n-wrong-prev');
    t.end();
});
