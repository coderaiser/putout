import {createTest} from '@putout/test';
import * as falsy from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-array-destructuring/falsy', falsy],
    ],
});

test('plugin-apply-destructuring: falsy: report: assignment', (t) => {
    t.report('falsy', `Use destructuring instead of setting 'maxElementsInOneLine' to 'undefined'`);
    t.end();
});

test('plugin-apply-destructuring: falsy: transform: array: variable-declarator', (t) => {
    t.transform('falsy');
    t.end();
});
