'use strict';

const {createTest} = require('@putout/test');
const declare = require('..');
const putout = require('@putout/plugin-putout');
const tryCatch = require('@putout/plugin-try-catch');
const promises = require('@putout/plugin-promises');
const printer = require('@putout/plugin-printer');
const removeNestedBlocks = require('@putout/plugin-remove-nested-blocks');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['declaration-before-reference', declare],
    ],
});

test('plugin-declaration-before-reference: report', (t) => {
    t.report('declaration', `Declare 'operator' before referencing to avoid 'ReferenceError'`);
    t.end();
});

test('plugin-declaration-before-reference: no report: class', (t) => {
    t.noReport('class');
    t.end();
});

test('plugin-declaration-before-reference: transform', (t) => {
    t.transform('declaration');
    t.end();
});

test('plugin-declaration-before-reference: transform: no lock', (t) => {
    t.transform('no-lock');
    t.end();
});

test('plugin-declaration-before-reference: transform: order', (t) => {
    t.transform('order');
    t.end();
});

test('plugin-declaration-before-reference: transform: putout', (t) => {
    t.transform('putout', {
        putout,
    });
    t.end();
});

test('plugin-declaration-before-reference: transform: try-to-catch', (t) => {
    t.transform('try-to-catch', {
        tryCatch,
        'promises/apply-to-level-await': promises.rules['apply-top-level-await'],
    });
    t.end();
});

test('plugin-declaration-before-reference: no transform: function', (t) => {
    t.noTransform('function');
    t.end();
});

test('plugin-declaration-before-reference: no transform: scopes', (t) => {
    t.noTransform('scopes');
    t.end();
});

test('plugin-declaration-before-reference: no transform: export', (t) => {
    t.noTransform('export');
    t.end();
});

test('plugin-declaration-before-reference: no transform: same-line', (t) => {
    t.noTransform('same-line');
    t.end();
});

test('plugin-declaration-before-reference: no report: assign', (t) => {
    t.noReport('assign');
    t.end();
});

test('plugin-declaration-before-reference: no transform: export-type', (t) => {
    t.noTransform('export-type');
    t.end();
});

const testDeclare = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['apply-types', printer.rules['apply-types']],
        ['declare-before-reference', declare],
        ['remove-nested-blocks', removeNestedBlocks],
    ],
});

testDeclare('printer: apply-types: no report: declare-before-reference', (t) => {
    t.noReportAfterTransform('apply-types');
    t.end();
});
