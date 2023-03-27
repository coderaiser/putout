'use strict';

const putout = require('@putout/plugin-putout');

const removeConsole = require('./fixture/remove-console');
const test = require('..')(__dirname, {
    'remove-console': removeConsole,
});

test('test: message', (t) => {
    t.report('property-identifier', `Avoid 'console' call`);
    t.end();
});

test('test: ts', (t) => {
    t.report('typescript', `Avoid 'console' call`);
    t.end();
});

test('test: message: all messages', (t) => {
    t.report('property-identifier', [
        `Avoid 'console' call`,
        `Avoid 'console' call`,
        `Avoid 'console' call`,
    ]);
    t.end();
});

test('test: no report', (t) => {
    t.noReport('declared');
    t.end();
});

test('test: reportCode', (t) => {
    t.reportCode('console.log()', `Avoid 'console' call`);
    t.end();
});

test('test: transformCode', (t) => {
    t.transformCode('console.log()', '');
    t.end();
});

test('test: noTransformCode', (t) => {
    t.noTransformCode('alert()');
    t.end();
});

test('test: property identifier', (t) => {
    t.transform('property-identifier');
    t.end();
});

test('test: property literal', (t) => {
    t.transform('property-literal', '\n\n');
    t.end();
});

test('test: declared', (t) => {
    t.noTransform('declared');
    t.end();
});

test('test: transform: typescript', (t) => {
    t.transform('typescript', '\n');
    t.end();
});

test('test: transform: plugin', (t) => {
    t.transform('plugin', {
        putout,
    });
    t.end();
});

test('test: transform: rule of a plugin: remove-unused-variables', (t) => {
    t.transform('remove-unused-variables', {
        'extract-object-properties': require('@putout/plugin-extract-object-properties'),
        'remove': require('@putout/plugin-remove-unused-variables'),
        'putout/convert-replace-with': putout.rules['convert-replace-with'],
    });
    t.end();
});

