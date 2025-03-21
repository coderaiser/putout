import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-empty-array-from-process', plugin],
    ],
});

test('putout: remove-empty-array-from-process: report', (t) => {
    t.report('remove-empty-array-from-process', `Avoid empty array used as 'process()' argument`);
    t.end();
});

test('putout: remove-empty-array-from-process: transform', (t) => {
    t.transform('remove-empty-array-from-process');
    t.end();
});
