'use strict';

const {createTest} = require('@putout/test');
const convertForToForOf = require('./index.js');

const test = createTest(__dirname, {
    'convert-for-to-for-of/entries': convertForToForOf,
});

test('plugin-convert-for-to-for-of: entries: report', (t) => {
    t.report('for', 'for-of should be used instead of for');
    t.end();
});

test('plugin-convert-for-to-for-of: entries: transform', (t) => {
    t.transform('for');
    t.end();
});

test('plugin-convert-for-to-for-of: entries: no transform: changed-index', (t) => {
    t.noTransform('changed-index');
    t.end();
});

test('plugin-convert-for-to-for-of: entries: no transform: index-not-identifier', (t) => {
    t.noTransform('index-not-identifier');
    t.end();
});

