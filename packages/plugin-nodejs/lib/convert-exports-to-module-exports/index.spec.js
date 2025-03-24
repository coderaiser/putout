import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-exports-to-module-exports', plugin],
    ],
});

test('packages: convert-exports-to-module-exports: report', (t) => {
    t.report('convert-exports-to-module-exports', `Use 'module.exports' instead of 'exports'`);
    t.end();
});

test('packages: convert-exports-to-module-exports: transform', (t) => {
    t.transform('convert-exports-to-module-exports');
    t.end();
});

test('packages: convert-exports-to-module-exports: no report: declared', (t) => {
    t.noReport('declared');
    t.end();
});
