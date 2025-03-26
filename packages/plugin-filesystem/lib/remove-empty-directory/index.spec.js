import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-empty-directory', plugin],
    ],
});

test('filesystem: remove-empty-directory: report', (t) => {
    t.report('remove-empty-directory', `Remove empty directory '/hello/abc/def'`);
    t.end();
});

test('filesystem: remove-empty-directory: transform', (t) => {
    t.transform('remove-empty-directory');
    t.end();
});
