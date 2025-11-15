import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-require-resolve-to-require', plugin],
    ],
});

test('packages: convert-require-resolve-to-require: report', (t) => {
    t.report('convert-require-resolve-to-require', `Convert 'require.resolve()' to 'require()'`);
    t.end();
});

test('packages: convert-require-resolve-to-require: no report: not-property', (t) => {
    t.noReport('not-property');
    t.end();
});

test('packages: convert-require-resolve-to-require: transform', (t) => {
    t.transform('convert-require-resolve-to-require');
    t.end();
});
