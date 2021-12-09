'use strict';

const convertReplaceToReplaceAll = require('.');

const test = require('@putout/test')(__dirname, {
    'regexp/convert-replace-to-replace-all': convertReplaceToReplaceAll,
});

test('plugin-regexp/convert-replace-to-replace-all: report', (t) => {
    t.report('replace', 'String should be used instead of RegExp');
    t.end();
});

test('plugin-regexp/convert-replace-to-replace-all: transform', (t) => {
    t.transform('replace');
    t.end();
});

test('plugin-regexp/convert-replace-to-replace-all: no transform: flags', (t) => {
    t.noTransform('replace-all-flags');
    t.end();
});

test('plugin-regexp/convert-replace-to-replace-all: no transform: replace with flags', (t) => {
    t.noTransform('replace-flags');
    t.end();
});

test('plugin-regexp/convert-replace-to-replace-all: no transform: character-class', (t) => {
    t.noTransform('character-class');
    t.end();
});

