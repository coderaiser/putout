import {createTest} from '@putout/test';
import * as variables from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['variables', variables],
    ],
});

test('putout: plugin-variables: report: remove-useless-rename', (t) => {
    t.report('remove-useless-rename', `Avoid useless variable declaration with name 'b'`);
    t.end();
});

test('putout: plugin-variables: transform: remove-useless-rename', (t) => {
    t.transform('remove-useless-rename');
    t.end();
});

test('putout: plugin-variables: no transform: global', (t) => {
    t.noTransform('global');
    t.end();
});

test('putout: plugin-variables: no report: shorthand', (t) => {
    t.noReport('shorthand');
    t.end();
});

test('putout: plugin-variables: transform: property', (t) => {
    t.transform('property');
    t.end();
});

test('putout: plugin-variables: no report: uppercase', (t) => {
    t.noReport('uppercase');
    t.end();
});

test('putout: plugin-variables: no transform: not-declared', (t) => {
    t.noTransform('not-declared');
    t.end();
});

test('putout: plugin-variables: no transform: argument', (t) => {
    t.noTransform('argument');
    t.end();
});

test('putout: plugin-variables: no transform: export', (t) => {
    t.noTransform('export');
    t.end();
});

test('putout: plugin-variables: no transform: var', (t) => {
    t.noTransform('var');
    t.end();
});

test('putout: plugin-variables: transform: remove-useless-declarations', (t) => {
    t.transform('remove-useless-declarations');
    t.end();
});

test('putout: plugin-variables: transform: remove-useless-duplicates', (t) => {
    t.transform('remove-useless-duplicates');
    t.end();
});

test('plugin-putout: plugin-variables: transform: remove-useless-assignment', (t) => {
    t.transform('remove-useless-assignment');
    t.end();
});

test('plugin-putout: plugin-variables: transform: remove-unreferenced', (t) => {
    t.transform('remove-unreferenced');
    t.end();
});

test('plugin-putout: plugin-variables: transform: convert-const-to-let', (t) => {
    t.transform('convert-const-to-let');
    t.end();
});

test('plugin-putout: plugin-variables: transform: split-declarations', (t) => {
    t.transform('split-declarations');
    t.end();
});

test('plugin-putout: plugin-variables: transform: remove-unused', (t) => {
    t.transform('remove-unused');
    t.end();
});

test('plugin-putout: plugin-variables: transform: extract-keywords', (t) => {
    t.transform('extract-keywords');
    t.end();
});

test('plugin-putout: plugin-variables: transform: apply-declarations-order', (t) => {
    t.transform('apply-declarations-order');
    t.end();
});
