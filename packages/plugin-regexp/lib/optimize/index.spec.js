import {createTest} from '@putout/test';
import * as optimize from './index.js';
import * as convertReplaceToReplaceAll from '../convert-replace-to-replace-all/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['regexp/optimize', optimize],
    ],
});

test('plugin-regexp/optimize: report: regexp', (t) => {
    t.report('regexp', 'RegExp /(ab|ab)/ can be optimized to /(ab)/');
    t.end();
});

test('plugin-regexp/optimize: transform: regexp', (t) => {
    t.transform('regexp');
    t.end();
});

test('plugin-regexp/optimize: no transform: same-length', (t) => {
    t.noTransform('same-length');
    t.end();
});

test('plugin-regexp/optimize: no transform: crash', (t) => {
    t.noTransform('crash');
    t.end();
});

test('plugin-regexp/optimize: transform: flags', (t) => {
    t.transform('flags');
    t.end();
});

test('plugin-regexp/optimize: transform: replace-all', (t) => {
    t.transform('replace-all', {
        'regexp/convert-replace-to-replace-all': convertReplaceToReplaceAll,
    });
    t.end();
});

test('plugin-regexp/optimize: no transform: escape', (t) => {
    t.noTransform('escape');
    t.end();
});

test('plugin-regexp/optimize: no-report-after-transform: after-fix', (t) => {
    t.noReportAfterTransform('after-fix');
    t.end();
});
