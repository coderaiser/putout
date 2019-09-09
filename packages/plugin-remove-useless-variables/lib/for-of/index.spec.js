'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-variables/for-of': require('.'),
});

test('remove usless variables: for-of: report', (t) => {
    t.report('for-of', 'Destructuring should be used in the head of for-of');
    t.end();
});

test('remove usless variables: for-of: transform', (t) => {
    t.transform('for-of');
    t.end();
});

test('remove usless variables: for-of: no transform: no destr', (t) => {
    t.noTransform('no-destr');
    t.end();
});

test('remove usless variables: for-of: no transform: more refs', (t) => {
    t.noTransform('more-refs');
    t.end();
});

test('remove usless variables: for-of: no transform: no declaration', (t) => {
    t.noTransform('no-declaration');
    t.end();
});

