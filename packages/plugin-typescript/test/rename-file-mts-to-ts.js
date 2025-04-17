import {createTest} from '@putout/test';
import * as typescript from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'typescript/rename-file-mts-to-ts': 'on',
    },
    plugins: [
        ['typescript', typescript],
    ],
});

test('plugin-typescript: rename-file-mts-to-ts: report: rename-file-mts-to-ts-on', (t) => {
    t.report('rename-file-mts-to-ts-on', `Rename '/lib/hello.mts' to '/lib/hello.ts'`);
    t.end();
});

test('plugin-typescript: rename-file-mts-to-ts: transform: rename-file-mts-to-ts-on', (t) => {
    t.transform('rename-file-mts-to-ts-on');
    t.end();
});
