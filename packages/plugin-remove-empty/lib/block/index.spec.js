import {createTest} from '@putout/test';
import * as removeNestedBlocks from '@putout/plugin-remove-nested-blocks';
import * as removeEmptyBlock from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-empty-block', removeEmptyBlock],
    ],
});

test('plugin-remove-empty: block: report: not-function', (t) => {
    t.report('not-function', 'Avoid useless empty blocks');
    t.end();
});

test('plugin-remove-empty: no report: block: else-comment', (t) => {
    t.noReport('else-comment');
    t.end();
});

test('plugin-remove-empty: block: function', (t) => {
    t.transform('function');
    t.end();
});

test('plugin-remove-empty: block: not-function', (t) => {
    t.transform('not-function');
    t.end();
});

test('plugin-remove-empty: block: try-catch', (t) => {
    t.transform('try-catch');
    t.end();
});

test('plugin-remove-empty: block: try', (t) => {
    t.transform('try', '\n');
    t.end();
});

test('plugin-remove-empty: block: if-else', (t) => {
    t.transform('if-else', '\n');
    t.end();
});

test('plugin-remove-empty: block: empty-if', (t) => {
    t.transform('empty-if');
    t.end();
});

test('plugin-remove-empty: block: empty if: empty-if-not-binary', (t) => {
    t.transform('empty-if-not-binary');
    t.end();
});

test('plugin-remove-empty: block: else-comment', (t) => {
    t.noTransform('else-comment');
    t.end();
});

test('plugin-remove-empty: block: comments', (t) => {
    t.noTransform('comments');
    t.end();
});

test('plugin-remove-empty: block: else', (t) => {
    t.transform('else');
    t.end();
});

test('plugin-remove-empty: block: else-if', (t) => {
    t.transform('else-if', '\n');
    t.end();
});

test('plugin-remove-empty: block: if-test-call', (t) => {
    t.transform('if-test-call');
    t.end();
});

test('plugin-remove-empty: block: block-fn', (t) => {
    t.transform('block-fn');
    t.end();
});

test('plugin-remove-empty: block: top-level', (t) => {
    t.transform('top-level');
    t.end();
});

test('plugin-remove-empty: block: transform: remove-nested-blocks', (t) => {
    t.transform('remove-nested-blocks', {
        removeNestedBlocks,
    });
    t.end();
});
