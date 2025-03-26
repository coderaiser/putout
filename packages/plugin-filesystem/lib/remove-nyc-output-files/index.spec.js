import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-nyc-output-files', plugin],
    ],
});

test('filesystem: remove-nyc-output-files: report', (t) => {
    t.report('remove-nyc-output-files', `Remove '.nyc_output': '/.nyc_output'`);
    t.end();
});

test('filesystem: remove-nyc-output-files: transform', (t) => {
    t.transform('remove-nyc-output-files');
    t.end();
});
