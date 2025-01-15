import {createTest} from '@putout/test';
import * as removeUnreferencedVariables from '@putout/plugin-remove-unreferenced-variables';
import * as declare from '@putout/plugin-declare';
import * as plugin from './index.js';
import * as shortenNames from '../shorten-names/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['merge-variables', plugin],
    ],
});

test('plugin-minify: merge-variables: report', (t) => {
    t.report('merge-variables', `Merge variables`);
    t.end();
});

test('plugin-minify: merge-variables: transform', (t) => {
    t.transform('merge-variables');
    t.end();
});

test('plugin-minify: merge-variables: transform: await', (t) => {
    t.transform('await');
    t.end();
});

test('plugin-minify: merge-variables: no transform: let', (t) => {
    t.noTransform('let');
    t.end();
});

test('plugin-minify: merge-variables: no transform: class', (t) => {
    t.noTransform('class');
    t.end();
});

test('plugin-minify: merge-variables: no transform: switch', (t) => {
    t.noTransform('switch');
    t.end();
});

test('plugin-minify: merge-variables: no transform: template', (t) => {
    t.noTransform('template');
    t.end();
});

test('plugin-minify: merge-variables: no transform: const', (t) => {
    t.noTransform('const');
    t.end();
});

test('plugin-minify: merge-variables: transform: before-init', (t) => {
    t.transform('before-init');
    t.end();
});

test('plugin-minify: merge-variables: transform: after-assign', (t) => {
    t.transform('after-assign');
    t.end();
});

test('plugin-minify: merge-variables: transform: duplicate', (t) => {
    t.transform('duplicate');
    t.end();
});

test('plugin-minify: merge-variables: transform: used-below', (t) => {
    t.transform('used-below', {
        shortenNames,
        declare,
    });
    t.end();
});

test('plugin-minify: merge-variables: no report: for-of', (t) => {
    t.noReport('for-of');
    t.end();
});

test('plugin-minify: merge-variables: transform: remove-unreferenced-variables', (t) => {
    t.transform('remove-unreferenced-variables', {
        'remove-unreferenced-variables': removeUnreferencedVariables,
    });
    t.end();
});
