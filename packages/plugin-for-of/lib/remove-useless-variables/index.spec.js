'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const removeUselessArrayFrom = require('../remove-useless-array-from');

const test = createTest(__dirname, {
    'for-of/remove-useless-variables': plugin,
});

test('putout: plugin-for-of: remove usless variables: report', (t) => {
    t.report('for-of', `Use destructuring in head of 'for...of'`);
    t.end();
});

test('putout: plugin-for-of: remove usless variables: transform', (t) => {
    t.transform('for-of');
    t.end();
});

test('putout: plugin-for-of: remove usless variables: transform: array-pattern', (t) => {
    t.transform('array-pattern');
    t.end();
});

test('putout: plugin-for-of: remove-useless-variables no transform: no destr', (t) => {
    t.noTransform('no-destr');
    t.end();
});

test('putout: plugin-for-of: remove-useless-variables no transform: more refs', (t) => {
    t.noTransform('more-refs');
    t.end();
});

test('putout: plugin-for-of: remove-useless-variables no transform: no declaration', (t) => {
    t.noTransform('no-declaration');
    t.end();
});

test('putout: plugin-for-of: remove-useless-variables no transform: multiple', (t) => {
    t.noTransform('for-of-multiple');
    t.end();
});

test('putout: plugin-for-of: remove-useless-variables no transform: assignment', (t) => {
    t.noTransform('assignment');
    t.end();
});

test('putout: plugin-for-of: remove-useless-variables transform with: array-from', (t) => {
    t.transform('array-from', {
        'remove-useless-array-from': removeUselessArrayFrom,
    });
    t.end();
});

test('putout: plugin-for-of: remove-useless-variables transform with options: multiple', (t) => {
    t.transformWithOptions('for-of-options', {
        maxProperties: Infinity,
    });
    t.end();
});

