import {createTest} from '@putout/test';
import * as typescript from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'typescript/rename-file-cts-to-ts': 'on',
    },
    plugins: [
        ['typescript', typescript],
    ],
});

test('plugin-typescript: rename-file-cts-to-ts: report: rename-file-cts-to-ts-on', (t) => {
    t.report('rename-file-cts-to-ts-on', `Rename '/lib/hello.cts' to '/lib/hello.ts'`);
    t.end();
});

test('plugin-typescript: rename-file-cts-to-ts: transform: rename-file-cts-to-ts-on', (t) => {
    t.transform('rename-file-cts-to-ts-on');
    t.end();
});
