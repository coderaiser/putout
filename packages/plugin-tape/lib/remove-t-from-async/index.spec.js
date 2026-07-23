import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-t-from-async', plugin],
    ],
});

test('tape: remove-t-from-async: report', (t) => {
    t.report('remove-t-from-async', `Use 'if condition' instead of 'ternary expression'`);
    t.end();
});

test('tape: remove-t-from-async: transform', (t) => {
    t.transform('remove-t-from-async');
    t.end();
});
