import {createTest} from '@putout/test';
import * as variables from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['variables', variables],
    ],
});

test('putout: plugin-variables: report: function', (t) => {
    t.report('function', 'Useless variable declaration with name "b"');
    t.end();
});

test('putout: plugin-variables: transform: function', (t) => {
    t.transform('function');
    t.end();
});

test('putout: plugin-variables: no transform: global', (t) => {
    t.noTransform('global');
    t.end();
});

test('putout: plugin-variables: transform: shorthand', (t) => {
    t.transform('shorthand');
    t.end();
});

test('putout: plugin-variables: transform: property', (t) => {
    t.transform('property');
    t.end();
});

test('putout: plugin-variables: transform: uppercase', (t) => {
    t.transform('uppercase');
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

test('putout: plugin-variables: transform: destructure', (t) => {
    t.transform('destructure');
    t.end();
});

test('putout: plugin-variables: transform: declaration', (t) => {
    t.transform('declaration');
    t.end();
});

test('putout: plugin-variables: transform: duplicate', (t) => {
    t.transform('duplicate');
    t.end();
});

test('plugin-putout: plugin-variables: transform: assignment', (t) => {
    t.transform('assignment');
    t.end();
});

test('plugin-putout: plugin-variables: transform: remove-unreferenced', (t) => {
    t.transform('remove-unreferenced');
    t.end();
});

test('plugin-putout: plugin-variables: transform: split-declarations', (t) => {
    t.transform('split-declarations');
    t.end();
});
