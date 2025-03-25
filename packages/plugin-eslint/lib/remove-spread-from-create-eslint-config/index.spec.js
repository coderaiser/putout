import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-spread-from-create-eslint-config', plugin],
    ],
});

test('eslint: remove-spread-from-create-eslint-config: report', (t) => {
    t.report('remove-spread-from-create-eslint-config', `Avoid spread ('...') in 'createEslintConfig'`);
    t.end();
});

test('eslint: remove-spread-from-create-eslint-config: transform', (t) => {
    t.transform('remove-spread-from-create-eslint-config');
    t.end();
});
