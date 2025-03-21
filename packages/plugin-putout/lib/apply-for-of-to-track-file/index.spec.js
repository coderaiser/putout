import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-for-of-to-track-file', plugin],
    ],
});

test('packages: apply-for-of-to-track-file: report', (t) => {
    t.report('apply-for-of-to-track-file', `Use 'if condition' instead of 'ternary expression'`);
    t.end();
});

test('packages: apply-for-of-to-track-file: transform', (t) => {
    t.transform('apply-for-of-to-track-file');
    t.end();
});
