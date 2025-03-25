import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-define-config', plugin],
    ],
});

test('eslint: apply-define-config: report', (t) => {
    t.report('apply-define-config', `Use 'defineConfig' instead of 'createESLintConfig'`);
    t.end();
});

test('eslint: apply-define-config: transform', (t) => {
    t.transform('apply-define-config');
    t.end();
});
