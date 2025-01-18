'use strict';

const {createTest} = require('@putout/test');
const tape = require('@putout/plugin-tape');
const putout = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['putout', putout],
    ],
});

test('plugin-putout: transform: no-transform-code', (t) => {
    t.transform('no-transform-code');
    t.end();
});

test('plugin-putout: complex: transform: shorten-putout-exports', (t) => {
    t.transform('shorten-putout-exports');
    t.end();
});

test('plugin-putout: convert-destructuring-to-identifier: complex: report: convert-destructuring-to-identifier', (t) => {
    t.report('convert-destructuring-to-identifier', 'Identifier should be used instead of empty destructuring');
    t.end();
});

test('plugin-putout: convert-destructuring-todentifier: complex: transform: convert-destructuring-to-identifier', (t) => {
    t.transform('convert-destructuring-to-identifier');
    t.end();
});

test('plugin-putout: convert-putout-test-to-create-test', (t) => {
    t.transform('convert-putout-test-to-create-test');
    t.end();
});

test('plugin-putout: convert-node-to-path-in-get-template-values: complex: transform: get-template-values', (t) => {
    t.transform('get-template-values');
    t.end();
});

test('plugin-putout: convert-traverse-to-include: complex: transform: convert-traverse-to-include', (t) => {
    t.transform('convert-traverse-to-include');
    t.end();
});

test('plugin-putout: convert-traverse-to-include: complex: transform: convert-traverse-to-replace', (t) => {
    t.transform('convert-traverse-to-replace');
    t.end();
});

test('plugin-putout: convert-process-to-find: convert-process-to-find', (t) => {
    t.transform('convert-process-to-find');
    t.end();
});

test('plugin-putout: convert-method-to-property: complex: transform: convert-method-to-property', (t) => {
    t.transform('convert-method-to-property');
    t.end();
});

test('plugin-putout: convert-method-to-property: complex: transform: apply-processors-destructuring', (t) => {
    t.transform('apply-processors-destructuring');
    t.end();
});

test('plugin-putout: transform: apply-insert-before', (t) => {
    t.transform('apply-insert-before');
    t.end();
});

test('plugin-putout: transform: apply-insert-after', (t) => {
    t.transform('apply-insert-after');
    t.end();
});

test('plugin-putout: convert-method-to-property: complex: transform: apply-async-formatter', (t) => {
    t.transform('apply-async-formatter');
    t.end();
});

test('plugin-putout: check-replace-code: complex: report: check-replace-code', (t) => {
    t.report('check-replace-code', `☝️ Looks like template values not linked: ["__a"] -> ["__b"]`);
    t.end();
});

test('plugin-putout: check-match: complex: report: check-match', (t) => {
    t.report('check-match', `☝️ Looks like 'match()' template absent in 'replace()'`);
    t.end();
});

test('plugin-putout: convert-method-to-property: complex: transform: declare', (t) => {
    t.transform('declare');
    t.end();
});

test('plugin-putout: convert-method-to-property: complex: transform: add-test-args', (t) => {
    t.transform('add-test-args');
    t.end();
});

test('plugin-putout: transform: add-traverse-args', (t) => {
    t.transform('add-traverse-args');
    t.end();
});

test('plugin-putout: convert-add-argument-to-add-args', (t) => {
    t.transform('convert-add-argument-to-add-args');
    t.end();
});

test('plugin-putout: transform: move-require-on-top-level', (t) => {
    t.transform('move-require-on-top-level');
    t.end();
});

test('plugin-putout: transform: convert-dirname-to-url', (t) => {
    t.transform('convert-dirname-to-url');
    t.end();
});

test('plugin-putout: transform: convert-url-to-dirname', (t) => {
    t.transform('convert-url-to-dirname');
    t.end();
});

test('plugin-putout: transform: apply-create-test', (t) => {
    t.transform('apply-create-test');
    t.end();
});

test('plugin-putout: transform: includer', (t) => {
    t.transform('includer');
    t.end();
});

test('plugin-putout: transform: convert-replace-to-function', (t) => {
    t.transform('convert-replace-to-function');
    t.end();
});

test('plugin-putout: transform: convert-match-to-function', (t) => {
    t.transform('convert-match-to-function');
    t.end();
});

test('plugin-putout: transform: apply-remove', (t) => {
    t.transform('apply-remove');
    t.end();
});

test('plugin-putout: transform: replace-test-message', (t) => {
    t.transform('replace-test-message');
    t.end();
});

test('plugin-putout: transform: convert-report-to-function', (t) => {
    t.transform('convert-report-to-function');
    t.end();
});

test('plugin-putout: transform: convert-number-to-numeric', (t) => {
    t.transform('convert-number-to-numeric');
    t.end();
});

test('plugin-putout: transform: apply-declare', (t) => {
    t.transform('apply-declare');
    t.end();
});

test('plugin-putout: transform: create-test', (t) => {
    t.transform('create-test');
    t.end();
});

test('plugin-putout: transform: apply-namaspace-specifier', (t) => {
    t.transform('apply-namaspace-specifier');
    t.end();
});

test('plugin-putout: transform: convert-get-rule-to-require', (t) => {
    t.transform('convert-get-rule-to-require');
    t.end();
});

test('plugin-putout: transform: add-index-to-import', (t) => {
    t.transform('add-index-to-import');
    t.end();
});

test('plugin-putout: transform: apply-rename', (t) => {
    t.transform('apply-rename');
    t.end();
});

test('plugin-putout: transform: apply-short-processors', (t) => {
    t.transform('apply-short-processors');
    t.end();
});

test('plugin-putout: transform: convert-traverse-to-scan', (t) => {
    t.transform('convert-traverse-to-scan');
    t.end();
});

test('plugin-putout: transform: add-track-file', (t) => {
    t.transform('add-track-file');
    t.end();
});

test('plugin-putout: transform: convert-progress-to-track-file', (t) => {
    t.transform('convert-progress-to-track-file');
    t.end();
});

test('plugin-putout: transform: add-await-to-progress', (t) => {
    t.transform('add-await-to-progress', {
        tape,
    });
    t.end();
});

test('plugin-putout: transform: apply-for-of-to-track-file', (t) => {
    t.transform('apply-for-of-to-track-file');
    t.end();
});

test('plugin-putout: transform: remove-unused-get-properties-argument', (t) => {
    t.transform('remove-unused-get-properties-argument');
    t.end();
});

test('plugin-putout: transform: add-store', (t) => {
    t.transform('add-store');
    t.end();
});

test('plugin-putout: transform: add-path-store', (t) => {
    t.transform('add-path-store');
    t.end();
});

test('plugin-putout: transform: simplify-replace-template', (t) => {
    t.transform('simplify-replace-template');
    t.end();
});

test('plugin-putout: transform: remove-empty-array-from-process', (t) => {
    t.transform('remove-empty-array-from-process');
    t.end();
});

test('plugin-putout: transform: add-places-to-compare-places', (t) => {
    t.transform('add-places-to-compare-places');
    t.end();
});

test('plugin-putout: transform: add-path-arg-to-fix', (t) => {
    t.transform('add-path-arg-to-fix');
    t.end();
});

test('plugin-putout: transform: convert-include-to-traverse', (t) => {
    t.transform('convert-include-to-traverse');
    t.end();
});

test('plugin-putout: transform: remove-useless-printer-option', (t) => {
    t.transform('remove-useless-printer-option');
    t.end();
});

test('plugin-putout: transform: add-path-arg-to-visitors', (t) => {
    t.transform('add-path-arg-to-visitors');
    t.end();
});

test('plugin-putout: transform: apply-fixture-name-to-message', (t) => {
    t.transform('apply-fixture-name-to-message');
    t.end();
});

test('plugin-putout: transform: apply-vars', (t) => {
    t.transform('apply-vars');
    t.end();
});

test('plugin-putout: transform: declare-template-variables', (t) => {
    t.transform('declare-template-variables');
    t.end();
});
