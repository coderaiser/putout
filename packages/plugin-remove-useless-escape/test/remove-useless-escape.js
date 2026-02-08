import {createTest} from '@putout/test';
import * as madrun from '@putout/plugin-madrun';
import * as removeUselessEscape from '../lib/remove-useless-escape.js';

const addFixLint = madrun.rules['add-fix-lint'];

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-escape', removeUselessEscape],
    ],
});

test('plugin-remove-useless-escape: report: string', (t) => {
    t.report('string', 'Unnecessary escape character');
    t.end();
});

test('plugin-remove-useless-escape: report: a: ^', (t) => {
    t.report('a', 'Unnecessary escape character');
    t.end();
});

test('plugin-remove-useless-escape: no report: no-emoji', (t) => {
    t.noReport('no-emoji');
    t.end();
});

test('plugin-remove-useless-escape: no report: new-line', (t) => {
    t.noReport('new-line');
    t.end();
});

test('plugin-remove-useless-escape: no report: escaped', (t) => {
    t.noReport('escaped');
    t.end();
});

test('plugin-remove-useless-escape: transform: string', (t) => {
    t.transform('string');
    t.end();
});

test('plugin-remove-useless-escape: transform: template', (t) => {
    t.transform('template');
    t.end();
});

test('plugin-remove-useless-escape: transform: a: ^', (t) => {
    t.transform('a');
    t.end();
});

test('plugin-remove-useless-escape: no report: slash', (t) => {
    t.noReport('slash');
    t.end();
});

test('plugin-remove-useless-escape: transform: quote', (t) => {
    t.transform('quote');
    t.end();
});

test('plugin-remove-useless-escape: no report after transform: quote', (t) => {
    t.noReportAfterTransform('quote');
    t.end();
});

test('plugin-remove-useless-escape: transform: emoji', (t) => {
    t.transform('emoji');
    t.end();
});

test('plugin-remove-useless-escape: transform: emoji: emoji-template', (t) => {
    t.transform('emoji-template');
    t.end();
});

test('plugin-remove-useless-escape: transform: plus', (t) => {
    t.transform('plus');
    t.end();
});

test('plugin-remove-useless-escape: transform: backtick', (t) => {
    t.transform('backtick');
    t.end();
});

test('plugin-remove-useless-escape: transform: coma', (t) => {
    t.transform('coma');
    t.end();
});

test('plugin-remove-useless-escape: transform: dollar', (t) => {
    t.transform('dollar');
    t.end();
});

test('plugin-remove-useless-escape: no-report: template-dollar', (t) => {
    t.noReport('template-dollar');
    t.end();
});

test('plugin-remove-useless-escape: transform: dot', (t) => {
    t.transform('dot');
    t.end();
});

test('plugin-remove-useless-escape: transform: h', (t) => {
    t.transform('h');
    t.end();
});

test('plugin-remove-useless-escape: transform: z', (t) => {
    t.transform('z');
    t.end();
});

test('plugin-remove-useless-escape: transform: no-raw', (t) => {
    t.transform('no-raw', {
        addFixLint,
    });
    t.end();
});
