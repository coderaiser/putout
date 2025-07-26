import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-namespace-to-global', plugin],
    ],
});

test('typescript: convert-namespace-to-global: report', (t) => {
    t.report('convert-namespace-to-global', `Use 'global' instead of 'namespace' in 'declare'`);
    t.end();
});

test('typescript: convert-namespace-to-global: transform', (t) => {
    t.transform('convert-namespace-to-global');
    t.end();
});

test('typescript: convert-namespace-to-global: no report: not-global', (t) => {
    t.noReport('not-global');
    t.end();
});
