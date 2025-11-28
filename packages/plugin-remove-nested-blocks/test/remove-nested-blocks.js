import {createTest} from '@putout/test';
import * as tape from '@putout/plugin-tape';
import * as removeEmpty from '@putout/plugin-remove-empty';
import * as forOf from '@putout/plugin-for-of';
import * as removeNestedBlocks from '../lib/remove-nested-blocks.js';

const {declare} = tape.rules;
const convertReduceToForOf = forOf.rules.reduce;

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-nested-blocks', removeNestedBlocks],
    ],
});

test('plugin-remove-nested-blocks: report: for-of', (t) => {
    t.report('for-of', 'Avoid nested blocks');
    t.end();
});

test('plugin-remove-nested-blocks: transform: for-of', (t) => {
    t.transform('for-of');
    t.end();
});

test('plugin-remove-nested-blocks: transform: switch: switch-no-vars', (t) => {
    t.transform('switch-no-vars');
    t.end();
});

test('plugin-remove-nested-blocks: transform: crawl', (t) => {
    t.transform('crawl', {
        'tape/declare': declare,
    });
    t.end();
});

test('plugin-remove-nested-blocks: transform: vars', (t) => {
    t.transform('vars');
    t.end();
});

test('plugin-remove-nested-blocks: transform: reduce', (t) => {
    t.transform('reduce', {
        'convert-reduce-to-for-of': convertReduceToForOf,
    });
    t.end();
});

test('plugin-remove-nested-blocks: transform: remove-empty', (t) => {
    t.transform('remove-empty', {
        'remove-empty': removeEmpty,
    });
    t.end();
});

test('plugin-remove-nested-blocks: no transform: switch', (t) => {
    t.noTransform('switch');
    t.end();
});

test('plugin-remove-nested-blocks: no transform: declared', (t) => {
    t.noTransform('declared');
    t.end();
});

test('plugin-remove-nested-blocks: no report: return', (t) => {
    t.noReport('return');
    t.end();
});

test('plugin-remove-nested-blocks: transform: intersect-single', (t) => {
    t.transform('intersect-single');
    t.end();
});

test('plugin-remove-nested-blocks: no report: intersect-multi', (t) => {
    t.noReport('intersect-multi');
    t.end();
});

test('plugin-remove-nested-blocks: no report: arrow', (t) => {
    t.noReport('arrow');
    t.end();
});

test('plugin-remove-nested-blocks: no report: import-assert', (t) => {
    t.noReport('import-assert');
    t.end();
});
