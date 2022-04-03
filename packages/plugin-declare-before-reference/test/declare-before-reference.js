'use strict';

const {createTest} = require('@putout/test');
const apply = require('..');
const putout = require('@putout/plugin-putout');

const test = createTest(__dirname, {
    'declaration-before-reference': apply,
});

test('plugin-declaration-before-reference: report', (t) => {
    t.report('declaration', `'operator' should be declared before referencing to avoid 'ReferenceError'`);
    t.end();
});

test('plugin-declaration-before-reference: no report: class', (t) => {
    t.noReport('class');
    t.end();
});

test('plugin-declaration-before-reference: transform', (t) => {
    t.transform('declaration');
    t.end();
});

test('plugin-declaration-before-reference: transform: putout', (t) => {
    t.transform('putout', {
        putout,
    });
    t.end();
});

test('plugin-declaration-before-reference: no transform: function', (t) => {
    t.noTransform('function');
    t.end();
});

test('plugin-declaration-before-reference: no transform: scopes', (t) => {
    t.noTransform('scopes');
    t.end();
});

test('plugin-declaration-before-reference: no transform: export', (t) => {
    t.noTransform('export');
    t.end();
});

