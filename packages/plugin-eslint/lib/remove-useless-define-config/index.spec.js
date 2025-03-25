import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-define-config', plugin],
    ],
});

test('eslint: remove-useless-define-config: report', (t) => {
    t.report('remove-useless-define-config', `Avoid useless defineConfig()`);
    t.end();
});

test('eslint: remove-useless-define-config: transform', (t) => {
    t.transform('remove-useless-define-config');
    t.end();
});

test('eslint: remove-useless-define-config: transform: empty', (t) => {
    t.transform('empty');
    t.end();
});
