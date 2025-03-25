import {createTest} from '@putout/test';
import * as eslint from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['eslint', eslint],
    ],
});

test('putout: plugin-eslint: report: json', (t) => {
    t.report('json', '"putout" should be in the end of the "extends" list');
    t.end();
});

test('putout: plugin-eslint: transform: json', (t) => {
    t.transform('json');
    t.end();
});

test('putout: plugin-eslint: transform: convert-ide-to-safe', (t) => {
    t.transform('convert-ide-to-safe');
    t.end();
});

test('putout: plugin-eslint: transform: apply-safe-align', (t) => {
    t.transform('apply-safe-align');
    t.end();
});

test('putout: plugin-eslint: transform: convert-require-to-import', (t) => {
    t.transform('convert-require-to-import');
    t.end();
});

test('putout: plugin-eslint: transform: remove-no-unpublished-require', (t) => {
    t.transform('remove-no-unpublished-require');
    t.end();
});

test('putout: plugin-eslint: transform: remove-overrides-with-empty-rules', (t) => {
    t.transform('remove-overrides-with-empty-rules');
    t.end();
});

test('putout: plugin-eslint: transform: remove-no-missing', (t) => {
    t.transform('remove-no-missing');
    t.end();
});

test('putout: plugin-eslint: transform: remove-no-unsupported-features', (t) => {
    t.transform('remove-no-unsupported-features');
    t.end();
});

test('putout: plugin-eslint: transform: add-putout', (t) => {
    t.transform('add-putout');
    t.end();
});

test('putout: plugin-eslint: transform: convert-node-to-n', (t) => {
    t.transform('convert-node-to-n');
    t.end();
});

test('plugin-eslint: transform: convert-rc-to-flat', (t) => {
    t.transform('convert-rc-to-flat');
    t.end();
});

test('plugin-eslint: transform: remove-useless-slice', (t) => {
    t.transform('remove-useless-slice');
    t.end();
});

test('plugin-eslint: transform: convert-files-to-array', (t) => {
    t.transform('convert-files-to-array');
    t.end();
});

test('putout: plugin-eslint: transform: declare', (t) => {
    t.transform('declare');
    t.end();
});

test('plugin-eslint: transform: apply-match-to-flat', (t) => {
    t.transform('apply-match-to-flat');
    t.end();
});

test('plugin-eslint: transform: apply-dir-to-flat', (t) => {
    t.transform('apply-dir-to-flat');
    t.end();
});

test('plugin-eslint: transform: convert-export-match-to-declaration', (t) => {
    t.transform('convert-export-match-to-declaration');
    t.end();
});

test('plugin-eslint: transform: convert-plugins-array-to-object', (t) => {
    t.transform('convert-plugins-array-to-object');
    t.end();
});

test('plugin-eslint: transform: remove-useless-properties', (t) => {
    t.transform('remove-useless-properties');
    t.end();
});

test('plugin-eslint: transform: apply-ignores', (t) => {
    t.transform('apply-ignores');
    t.end();
});

test('plugin-eslint: transform: apply-create-eslint-config', (t) => {
    t.transform('apply-create-eslint-config');
    t.end();
});

test('plugin-eslint: transform: remove-parser-options', (t) => {
    t.transform('remove-parser-options');
    t.end();
});

test('plugin-eslint: transform: remove-spread-from-create-eslint-config', (t) => {
    t.transform('remove-spread-from-create-eslint-config');
    t.end();
});

test('plugin-eslint: transform: remove-suffix-config', (t) => {
    t.transform('remove-suffix-config');
    t.end();
});

test('plugin-eslint: transform: remove-create-eslint-config-with-one-argument', (t) => {
    t.transform('remove-create-eslint-config-with-one-argument');
    t.end();
});

test('plugin-eslint: transform: remove-useless-match-to-flat', (t) => {
    t.transform('remove-useless-match-to-flat');
    t.end();
});

test('plugin-eslint: transform: apply-define-config', (t) => {
    t.transform('apply-define-config');
    t.end();
});

test('plugin-eslint: transform: remove-useless-define-config', (t) => {
    t.transform('remove-useless-define-config');
    t.end();
});
