import * as putout from '@putout/plugin-putout';
import * as destructuring from '@putout/plugin-destructuring';
import * as variables from '@putout/plugin-variables';
import {createTest} from '../lib/test.mjs';
import * as removeConsole from './fixture/remove-console.js';

const removeUnusedVariables = variables.rules['remove-unused'];
const test = createTest(import.meta.url, {
    plugins: [
        ['remove-console', removeConsole],
    ],
});

const extractObjectProperties = destructuring.rules['extract-properties-equal-deep'];

test('test: report: property-identifier', (t) => {
    t.report('property-identifier', `Avoid 'console' call`);
    t.end();
});

test('test: typescript', (t) => {
    t.report('typescript', `Avoid 'console' call`);
    t.end();
});

test('test: message: property-identifier', (t) => {
    t.report('property-identifier', [`Avoid 'console' call`, `Avoid 'console' call`, `Avoid 'console' call`]);
    t.end();
});

test('test: no report: declared', (t) => {
    t.noReport('declared');
    t.end();
});

test('test: reportCode', (t) => {
    t.reportCode('console.log()', `Avoid 'console' call`);
    t.end();
});

test('test: transformCode', (t) => {
    t.transformCode('console.log()', '\n');
    t.end();
});

test('test: noTransformCode', (t) => {
    t.noTransformCode('alert();\n');
    t.end();
});

test('test: transform: property-identifier', (t) => {
    t.transform('property-identifier');
    t.end();
});

test('test: property-literal', (t) => {
    t.transform('property-literal', '\n');
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
        'extract-object-properties': extractObjectProperties,
        'remove': removeUnusedVariables,
        'putout/convert-replace-with': putout.rules['convert-replace-with'],
    });
    t.end();
});
