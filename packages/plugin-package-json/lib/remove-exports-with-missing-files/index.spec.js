import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-exports-with-missing-files', plugin],
    ],
});

test('package-json: remove-exports-with-missing-files: report', (t) => {
    t.report('remove-exports-with-missing-files', `Avoid exports with missing files`);
    t.end();
});

test('package-json: remove-exports-with-missing-files: transform', (t) => {
    t.transform('remove-exports-with-missing-files');
    t.end();
});

test('package-json: remove-exports-with-missing-files: no report', (t) => {
    t.noReport('no-exports');
    t.end();
});
