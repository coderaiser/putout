'use strict';

const {createTest} = require('@putout/test');
const convertForToForOf = require('..');

const test = createTest(__dirname, {
    'convert-for-to-for-of': convertForToForOf,
});

test('plugin-convert-for-to-for-of: report', (t) => {
    t.report('for', `Use 'for...of' instead of 'for'`);
    t.end();
});

test('plugin-convert-for-to-for-of: transform', (t) => {
    t.transform('for');
    t.end();
});

test('plugin-convert-for-to-for-of: transform: for to n', (t) => {
    t.transform('for-to-n');
    t.end();
});

test('plugin-convert-for-to-for-of: transform: entries', (t) => {
    t.transform('entries');
    t.end();
});

test('plugin-convert-for-to-for-of: transform: entries-n', (t) => {
    t.transform('entries-n');
    t.end();
});

test('plugin-convert-for-to-for-of: no transform: no body', (t) => {
    t.noTransform('no-body');
    t.end();
});

test('plugin-convert-for-to-for-of: no transform: for to n no prev', (t) => {
    t.noTransform('for-to-n-no-prev');
    t.end();
});

test('plugin-convert-for-to-for-of: no transform: for to n no assign', (t) => {
    t.noTransform('for-to-n-no-assign');
    t.end();
});

test('plugin-convert-for-to-for-of: no transform: for to n wrong prev', (t) => {
    t.noTransform('for-to-n-wrong-prev');
    t.end();
});

