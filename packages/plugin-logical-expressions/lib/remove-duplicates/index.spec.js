import {createTest} from '@putout/test';
import * as removeDuplicates from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['logical-expression/remove-duplicates', removeDuplicates],
    ],
});

test('plugin-logical-expression: remove-duplicates: report: duplicates', (t) => {
    t.report('duplicates', 'Avoid duplicates in logical expressions');
    t.end();
});

test('plugin-logical-expression: remove-duplicates: transform: duplicates', (t) => {
    t.transform('duplicates');
    t.end();
});

test('plugin-logical-expression: transform: remove-duplicates: same', (t) => {
    t.transform('same');
    t.end();
});

test('plugin-logical-expression: no transform: remove-duplicates: different', (t) => {
    t.noTransform('different');
    t.end();
});
