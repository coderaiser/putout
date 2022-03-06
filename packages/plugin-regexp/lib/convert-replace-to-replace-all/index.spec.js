'use strict';

const {createTest} = require('@putout/test');
const convertReplaceToReplaceAll = require('.');

const test = createTest(__dirname, {
    'regexp/convert-replace-to-replace-all': convertReplaceToReplaceAll,
});

test('plugin-regexp/convert-replace-to-replace-all: report', (t) => {
    t.report('replace', `Use 'replaceAll()' instead of 'replace()'`);
    t.end();
});

test('plugin-regexp/convert-replace-to-replace-all: transform', (t) => {
    t.transform('replace');
    t.end();
});

test('plugin-regexp/convert-replace-to-replace-all: transform: couple', (t) => {
    t.transform('couple');
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

