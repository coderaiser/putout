import {createTest} from '@putout/test';
import * as convertReplaceToReplaceAll from './index.js';
import * as optimize from '../optimize/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['regexp/convert-replace-to-replace-all', convertReplaceToReplaceAll],
    ],
});

test('plugin-regexp/convert-replace-to-replace-all: report: replace', (t) => {
    t.report('replace', `Use 'replaceAll()' instead of 'replace()'`);
    t.end();
});

test('plugin-regexp/convert-replace-to-replace-all: transform: replace', (t) => {
    t.transform('replace');
    t.end();
});

test('plugin-regexp/convert-replace-to-replace-all: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('plugin-regexp/convert-replace-to-replace-all: transform: escape', (t) => {
    t.transform('escape');
    t.end();
});

test('plugin-regexp/convert-replace-to-replace-all: no transform: newline', (t) => {
    t.noTransform('newline');
    t.end();
});

test('plugin-regexp/convert-replace-to-replace-all: no transform: backtick', (t) => {
    t.noTransform('backtick');
    t.end();
});

test('plugin-regexp/convert-replace-to-replace-all: no transform: replace-all-flags', (t) => {
    t.noTransform('replace-all-flags');
    t.end();
});

test('plugin-regexp/convert-replace-to-replace-all: no transform: replace-flags', (t) => {
    t.noTransform('replace-flags');
    t.end();
});

test('plugin-regexp/convert-replace-to-replace-all: no transform: wildcard', (t) => {
    t.noTransform('wildcard');
    t.end();
});

test('plugin-regexp/convert-replace-to-replace-all: no transform: character-class', (t) => {
    t.noTransform('character-class');
    t.end();
});

test('plugin-regexp/convert-replace-to-replace-all:: transform: optimize', (t) => {
    t.transform('optimize', {
        'regexp/optimize': optimize,
    });
    t.end();
});
