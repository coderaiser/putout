import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-with-from-typos-step', plugin],
    ],
});

test('github: remove-useless-with-from-typos-step: report', (t) => {
    t.report('remove-useless-with-from-typos-step', `Remove empty 'needs: []' from GitHub Actions 🐙`);
    t.end();
});

test('github: remove-useless-with-from-typos-step: transform', (t) => {
    t.transform('remove-useless-with-from-typos-step');
    t.end();
});
