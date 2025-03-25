import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-create-eslint-config-with-one-argument', plugin],
    ],
});

test('eslint: remove-create-eslint-config-with-one-argument: report', (t) => {
    t.report('remove-create-eslint-config-with-one-argument', `Remove 'createESLintConfig()' with one argument`);
    t.end();
});

test('eslint: remove-create-eslint-config-with-one-argument: transform', (t) => {
    t.transform('remove-create-eslint-config-with-one-argument');
    t.end();
});
