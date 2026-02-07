import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-empty', plugin],
    ],
});

test('arguments: remove-empty: report', (t) => {
    t.report('remove-empty', `Avoid empty arguments`);
    t.end();
});

test('arguments: remove-empty: transform', (t) => {
    t.transform('remove-empty');
    t.end();
});
