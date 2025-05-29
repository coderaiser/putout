import {createTest} from '@putout/test';
import * as convertNodeToPathInGetTemplateValues from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/convert-node-to-path-in-get-template-values', convertNodeToPathInGetTemplateValues],
    ],
});

test('plugin-putout: convert-node-to-path-in-get-template-values: report: get-template-values', (t) => {
    t.report('get-template-values', '"path" should be used instead of "node" in getTemplateValues');
    t.end();
});

test('plugin-putout: convert-node-to-path-in-get-template-values: transform: get-template-values', (t) => {
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

test('plugin-putout: convert-node-to-path-in-get-template-values: no report: parent-path', (t) => {
    t.noReport('parent-path');
    t.end();
});

test('plugin-putout: convert-node-to-path-in-get-template-values: no report: prev-path', (t) => {
    t.noReport('prev-path');
    t.end();
});
