import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['convert-eslintrc-to-flat', plugin],
    ],
});

test('eslint: convert-eslintrc-to-flat: report', (t) => {
    t.report('convert-eslintrc-to-flat', `Use FlatConfig instead of ESLintRC`);
    t.end();
});

test('eslint: convert-eslintrc-to-flat: transform', (t) => {
    t.transform('convert-eslintrc-to-flat');
    t.end();
});
