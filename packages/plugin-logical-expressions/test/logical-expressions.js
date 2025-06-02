import {createTest} from '@putout/test';
import * as logicalExpressions from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['logical-expressions', logicalExpressions],
    ],
});

test('plugin-logical-expressions: transform: simplify', (t) => {
    t.transform('simplify');
    t.end();
});

test('plugin-logical-expressions: transform: remove-boolean', (t) => {
    t.transform('remove-boolean');
    t.end();
});

test('plugin-logical-expressions: transform: remove-duplicates', (t) => {
    t.transform('remove-duplicates');
    t.end();
});

test('plugin-logical-expressions: convert-bitwise-to-logical', (t) => {
    t.transform('convert-bitwise-to-logical');
    t.end();
});
