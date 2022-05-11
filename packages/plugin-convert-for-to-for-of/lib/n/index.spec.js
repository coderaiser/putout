'use strict';

const {createTest} = require('@putout/test');
const n = require('.');

const test = createTest(__dirname, {
    'convert-for-to-for-of/n': n,
});

test('plugin-convert-for-to-for-of: n: no report', (t) => {
    t.noReport('no-length');
    t.end();
});

test('plugin-convert-for-to-for-of: n: no transform', (t) => {
    t.noTransform('no-length');
    t.end();
});

test('plugin-convert-for-to-for-of: n: transform: used length', (t) => {
    t.transform('used-length');
    t.end();
});

test('plugin-convert-for-to-for-of: n: no transform: more i references', (t) => {
    t.noTransform('for-more');
    t.end();
});

test('plugin-convert-for-to-for-of: n: no transform: no-name', (t) => {
    t.noTransform('no-name');
    t.end();
});

test('plugin-convert-for-to-for-of: n: transform: remove-useless-arguments', (t) => {
    t.transform('remove-useless-arguments', {
        'remove-unused-variables': require('@putout/plugin-remove-unused-variables'),
        'remove-useless-arguments': require('@putout/plugin-remove-useless-arguments'),
    });
    t.end();
});
