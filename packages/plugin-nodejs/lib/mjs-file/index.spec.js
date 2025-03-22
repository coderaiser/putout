import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['mjs-file', plugin],
    ],
});

test('packages: mjs-file: report', (t) => {
    t.report('mjs-file', `Use 'ESM' instead of 'CommonJS'`);
    t.end();
});

test('packages: mjs-file: transform', (t) => {
    t.transform('mjs-file');
    t.end();
});

test('packages: mjs-file: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});
