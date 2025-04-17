import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['rename-file-mts-to-ts', plugin],
    ],
});

test('typescript: rename-file-mts-to-ts: report', (t) => {
    t.report('rename-file-mts-to-ts', `Rename '/lib/hello.mts' to '/lib/hello.ts'`);
    t.end();
});

test('typescript: rename-file-mts-to-ts: transform', (t) => {
    t.transform('rename-file-mts-to-ts');
    t.end();
});
