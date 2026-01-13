import {createTest} from '@putout/test';
import * as addAwaitToReImport from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/add-await-to-re-import', addAwaitToReImport],
    ],
});

test('plugin-tape: add-await-to-re-import: report: re-import', (t) => {
    t.report('re-import', `Call 'reImport()' using await`);
    t.end();
});

test('plugin-tape: add-await-to-re-import: transform: re-import', (t) => {
    t.transform('re-import');
    t.end();
});

test('plugin-tape: add-await-to-re-import: transform: block', (t) => {
    t.transform('block');
    t.end();
});
