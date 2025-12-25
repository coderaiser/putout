import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-ds-store-file', plugin],
    ],
});

test('putout: plugin-filesystem: remove-ds-store-file: report', (t) => {
    t.report('remove-ds-store-file', `Remove '.DS_Store': '/.DS_Store'`);
    t.end();
});

test('putout: plugin-filesystem: remove-ds-store-file: transform', (t) => {
    t.transform('remove-ds-store-file');
    t.end();
});
