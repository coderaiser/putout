import {createTest} from '@putout/test';
import * as typescript from '../lib/export.js';

const test = createTest(import.meta.url, {
    rules: {
        'typescript/find-file': ['on', {
            ignore: [],
        }],
    },
    plugins: [
        ['typescript', typescript],
    ],
});

test('plugin-typescript: transform: find-file', (t) => {
    t.transform('find-file');
    t.end();
});

const testIgnore = createTest(import.meta.url, {
    rules: {
        'typescript/find-file': ['on', {
            ignore: ['*.ts'],
        }],
    },
    plugins: [
        ['typescript', typescript],
    ],
});

testIgnore('plugin-typescript: no transform: find-file: find-file-ignore', (t) => {
    t.noTransform('find-file-ignore');
    t.end();
});
