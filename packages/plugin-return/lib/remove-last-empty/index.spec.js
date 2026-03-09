import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-last-empty', plugin],
    ],
});

test('return: remove-last-empty: report', (t) => {
    t.report('remove-last-empty', `Avoid empty 'return' in function body`);
    t.end();
});

test('return: remove-last-empty: transform', (t) => {
    t.transform('remove-last-empty');
    t.end();
});
