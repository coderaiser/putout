import {createTest} from '@putout/test';
import * as destructuring from '@putout/plugin-destructuring';
import * as variables from '@putout/plugin-variables';
import * as putout from '@putout/plugin-putout';
import * as extractObjectProperties from './index.js';

const removeUnusedVariables = variables.rules['remove-unused'];

const test = createTest(import.meta.url, {
    plugins: [
        ['extract-object-properties', extractObjectProperties],
    ],
});

test('plugin-extract-object-properties: not-equal-deep: report: object', (t) => {
    t.report('object', 'Extract object properties into variables');
    t.end();
});

test('plugin-extract-object-properties: not-equal-deep: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-extract-object-properties: not-equal-deep: transform: fn', (t) => {
    t.transform('fn');
    t.end();
});

test('plugin-extract-object-properties: not-equal-deep: transform: operate', (t) => {
    t.transform('operate', {
        putout,
    });
    t.end();
});

test('plugin-extract-object-properties: not-equal-deep: no transform: var-exists', (t) => {
    t.noTransform('var-exists');
    t.end();
});

test('plugin-extract-object-properties: not-equal-deep: no transform: not-destr', (t) => {
    t.noTransform('not-destr');
    t.end();
});

test('plugin-extract-object-properties: not-equal-deep: no transform: not-identifier', (t) => {
    t.noTransform('not-identifier');
    t.end();
});

test('plugin-extract-object-properties: not-equal-deep: no transform: different-scopes', (t) => {
    t.noTransform('different-scopes');
    t.end();
});

test('plugin-extract-object-properties: not-equal-deep: transform: no-scope', (t) => {
    t.transform('no-scope', {
        destructuring,
    });
    t.end();
});

test('plugin-extract-object-properties: not-equal-deep: transform: remove unused-variables: remove-unused-variables', (t) => {
    t.transform('remove-unused-variables', {
        'remove': removeUnusedVariables,
        'putout/convert-replace-with': putout.rules['convert-replace-with'],
    });
    t.end();
});
