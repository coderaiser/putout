import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['coverage/remove-files', plugin],
    ],
});

test('putout: plugin-coverage: remove-files: report', (t) => {
    t.report('remove-files', `Remove files: '/coverage'`);
    t.end();
});

test('filesystem: remove-nyc-output-files: transform: remove-files', (t) => {
    t.transform('remove-files');
    t.end();
});
