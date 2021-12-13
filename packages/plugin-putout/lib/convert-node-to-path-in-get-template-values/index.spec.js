'use strict';

const {createTest} = require('@putout/test');
const convertNodeToPathInGetTemplateValues = require('.');

const test = createTest(__dirname, {
    'putout/convert-node-to-path-in-get-template-values': convertNodeToPathInGetTemplateValues,
});

test('plugin-putout: convert-node-to-path-in-get-template-values: report', (t) => {
    t.report('get-template-values', '"path" should be used instead of "node" in getTemplateValues');
    t.end();
});

test('plugin-putout: convert-node-to-path-in-get-template-values: transform', (t) => {
    t.transform('get-template-values');
    t.end();
});

test('plugin-putout: convert-node-to-path-in-get-template-values: transform: node', (t) => {
    t.transform('node');
    t.end();
});

test('plugin-putout: convert-node-to-path-in-get-template-values: no transform: array-destructuring', (t) => {
    t.noTransform('array-destructuring');
    t.end();
});

