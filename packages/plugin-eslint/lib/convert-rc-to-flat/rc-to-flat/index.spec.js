import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-eslintrc-to-flat', plugin],
    ],
});

test('eslint: convert-rc-to-flat: rc-to-flat: report: convert-eslintrc-to-flat', (t) => {
    t.report('convert-eslintrc-to-flat', `Use FlatConfig instead of ESLintRC`);
    t.end();
});

test('eslint: convert-rc-to-flat: rc-to-flat: transform: convert-eslintrc-to-flat', (t) => {
    t.transform('convert-eslintrc-to-flat');
    t.end();
});

test('eslint: convert-rc-to-flat: rc-to-flat: no-extends', (t) => {
    t.transform('no-extends');
    t.end();
});
