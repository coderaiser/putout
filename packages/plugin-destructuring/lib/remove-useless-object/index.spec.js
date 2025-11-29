import {createTest} from '@putout/test';
import * as removeUselessObject from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['destructuring/remove-useless-object', removeUselessObject],
    ],
});

test('plugin-destructuring: remove-useless-object: report: assignment', (t) => {
    t.report('remove-useless-object', `Use destructuring instead of setting 'maxElementsInOneLine' to 'undefined'`);
    t.end();
});

test('plugin-destructuring: remove-useless-object: transform: array: variable-declarator', (t) => {
    t.transform('remove-useless-object');
    t.end();
});
