import {createTest} from '@putout/test';
import * as coverage from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'coverage/remove-files': 'on',
    },
    plugins: [
        ['coverage', coverage],
    ],
});

test('plugin-coverage: report: remove-files', (t) => {
    t.report('remove-files', `Remove files: '/coverage'`);
    t.end();
});

test('plugin-coverage: transform: remove-files', (t) => {
    t.transform('remove-files');
    t.end();
});
