import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['cts-file', plugin],
    ],
});

test('typescript: cts-file: report', (t) => {
    t.report('cts-file', `Use 'CommonJS' instead of 'ESM'`);
    t.end();
});

test('typescript: cts-file: transform', (t) => {
    t.transform('cts-file');
    t.end();
});
