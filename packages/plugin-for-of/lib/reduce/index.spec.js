import {createTest} from '@putout/test';
import * as removeNestedBlocks from '@putout/plugin-remove-nested-blocks';
import * as removeUnreferencedVariables from '@putout/plugin-remove-unreferenced-variables';
import * as convertMapToForOf from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-reduce-to-for-of', convertMapToForOf],
    ],
});

test('plugin-convert-reduce-to-for-of: report: reduce', (t) => {
    t.report('reduce', `Use 'for...of' instead of '.reduce()'`);
    t.end();
});

test('plugin-convert-reduce-to-for-of: transform: reduce', (t) => {
    t.transform('reduce');
    t.end();
});

test('plugin-convert-reduce-to-for-of: transform: two', (t) => {
    t.transform('two');
    t.end();
});

test('plugin-convert-reduce-to-for-of: no report: export', (t) => {
    t.noReport('export');
    t.end();
});

test('plugin-convert-reduce-to-for-of: transform: initial', (t) => {
    t.transform('initial', {
        'remove-nested-blocks': removeNestedBlocks,
    });
    t.end();
});

test('plugin-convert-reduce-to-for-of: no transform: call-expression', (t) => {
    t.noTransform('call-expression');
    t.end();
});

test('plugin-convert-reduce-to-for-of: transform: remove-unreferenced-variables', (t) => {
    t.transform('remove-unreferenced-variables', {
        'remove-unreferenced-variables': removeUnreferencedVariables,
    });
    t.end();
});
