import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-dir-to-flat', plugin],
    ],
});

test('eslint: apply-dir-to-flat: report', (t) => {
    t.report('apply-dir-to-flat', `Add '__dirname/import.meta.url' as first argument`);
    t.end();
});

test('eslint: apply-dir-to-flat: transform', (t) => {
    t.transform('apply-dir-to-flat');
    t.end();
});

test('eslint: apply-dir-to-flat: transform: esm', (t) => {
    t.transform('esm');
    t.end();
});
