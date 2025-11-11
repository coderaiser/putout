import {createTest} from '@putout/test';
import * as declare from '@putout/plugin-declare';
import * as applyTopLevelAwait from './index.js';
import * as addMissingAsync from '../add-missing-async/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-top-level-await', applyTopLevelAwait],
    ],
});

test('plugin-promises: apply-top-level-await: report: esm', (t) => {
    t.report('esm', `Use top level 'await'`);
    t.end();
});

test('plugin-promises: apply-top-level-await: transform: esm', (t) => {
    t.transform('esm');
    t.end();
});

test('plugin-promises: apply-top-level-await: transform: export', (t) => {
    t.transform('export');
    t.end();
});

test('plugin-promises: apply-top-level-await: transform: export-default', (t) => {
    t.transform('export-default');
    t.end();
});

test('plugin-promises: apply-top-level-await: no transform: not-esm', (t) => {
    t.noTransform('not-esm');
    t.end();
});

test('plugin-promises: apply-top-level-await: no transform: id', (t) => {
    t.noTransform('id');
    t.end();
});

test('plugin-promises: apply-top-level-await: no transform: params', (t) => {
    t.noTransform('params');
    t.end();
});

test('plugin-promises: apply-top-level-await: no report: params', (t) => {
    t.noReport('params');
    t.end();
});

test('plugin-promises: apply-top-level-await: no report: iife', (t) => {
    t.noReport('iife');
    t.end();
});

test('plugin-promises: apply-top-level-await: transform: iife-async', (t) => {
    t.transform('iife-async');
    t.end();
});

test('plugin-add-missing-await: transform: use-effect', (t) => {
    t.transform('use-effect', {
        addMissingAsync,
        declare,
    });
    t.end();
});
