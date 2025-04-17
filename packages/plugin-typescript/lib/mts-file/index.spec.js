import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['mts-file', plugin],
    ],
});

test('typescript: mts-file: report', (t) => {
    t.report('mts-file', `Use 'ESM' instead of 'CommonJS'`);
    t.end();
});

test('typescript: mts-file: transform', (t) => {
    t.transform('mts-file');
    t.end();
});
