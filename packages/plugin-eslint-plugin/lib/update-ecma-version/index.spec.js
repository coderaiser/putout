import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['update-ecma-version', plugin],
    ],
});

test('eslint-plugin: update-ecma-version: report', (t) => {
    t.report('update-ecma-version', `Set 'ecmaVersion' to: 2025`);
    t.end();
});

test('eslint-plugin: update-ecma-version: transform', (t) => {
    t.transform('update-ecma-version');
    t.end();
});

test('eslint-plugin: update-ecma-version: no report: more', (t) => {
    t.noReport('more');
    t.end();
});

test('eslint-plugin: update-ecma-version: no report after transform', (t) => {
    t.noReportAfterTransform('update-ecma-version');
    t.end();
});
