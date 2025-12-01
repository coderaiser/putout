import {createTest} from '@putout/test';
import * as rename from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-variables/rename', rename],
    ],
});

test('remove-useless-variables: rename: report: function', (t) => {
    t.report('function', 'Useless variable declaration with name "b"');
    t.end();
});

test('remove-useless-variables: rename: transform: function', (t) => {
    t.transform('function');
    t.end();
});

test('remove-useless-variables: rename: no transform: global', (t) => {
    t.noTransform('global');
    t.end();
});

test('remove-useless-variables: rename: no transform: destructure', (t) => {
    t.noTransform('destructure');
    t.end();
});

test('remove-useless-variables: rename: transform: shorthand', (t) => {
    t.transform('shorthand');
    t.end();
});

test('remove-useless-variables: rename: transform: property', (t) => {
    t.transform('property');
    t.end();
});

test('remove-useless-variables: rename: transform: uppercase', (t) => {
    t.transform('uppercase');
    t.end();
});

test('remove-useless-variables: rename: no transform: not-declared', (t) => {
    t.noTransform('not-declared');
    t.end();
});

test('remove-useless-variables: rename: no transform: argument', (t) => {
    t.noTransform('argument');
    t.end();
});

test('remove-useless-variables: rename: no transform: export', (t) => {
    t.noTransform('export');
    t.end();
});

test('remove-useless-variables: rename: no transform: var', (t) => {
    t.noTransform('var');
    t.end();
});
