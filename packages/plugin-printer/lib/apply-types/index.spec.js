'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');
const declareBeforeReference = require('@putout/plugin-declare-before-reference');
const removeNestedBlocks = require('@putout/plugin-remove-nested-blocks');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['apply-types', plugin],
    ],
});

test('printer: apply-types: report', (t) => {
    t.report('apply-types', `require: ('@putout/babel') -> ('putout/babel').types`);
    t.end();
});

test('printer: apply-types: transform', (t) => {
    t.transform('apply-types');
    t.end();
});

test('printer: apply-types: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('printer: apply-types: no report: no pattern', (t) => {
    t.noReport('no-pattern');
    t.end();
});

test('printer: apply-types: no report after transform: declare-before-reference', (t) => {
    t.noReportAfterTransform('declare-before-reference', {
        'apply-types': plugin,
        'declare-before-reference': declareBeforeReference,
        'remove-nested-blocks': removeNestedBlocks,
    });
    t.end();
});
