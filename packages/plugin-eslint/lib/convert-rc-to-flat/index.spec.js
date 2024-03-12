import {createTest} from '@putout/test';
import plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['convert-rc-to-flat', plugin],
    ],
});

test('eslint: convert-rc-to-flat: report', (t) => {
    t.report('convert-rc-to-flat', `Use FlatConfig instead of ESLintRC`);
    t.end();
});

test('eslint: convert-rc-to-flat: transform', (t) => {
    t.transform('convert-rc-to-flat');
    t.end();
});
