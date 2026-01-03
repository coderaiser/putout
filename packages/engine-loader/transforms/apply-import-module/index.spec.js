import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-import-module', plugin],
    ],
});

test('engine-loader: apply-import-module: report', (t) => {
    t.report('apply-import-module', `Use 'import {createRequire}' -> 'import module' for rollup'`);
    t.end();
});

test('engine-loader: apply-import-module: transform', (t) => {
    t.transform('apply-import-module');
    t.end();
});

test('engine-loader: apply-import-module: transform: as', (t) => {
    t.transform('as');
    t.end();
});

test('engine-loader: apply-import-module: no report: test', (t) => {
    t.noReport('test');
    t.end();
});

test('engine-loader: apply-import-module: no report: stub', (t) => {
    t.noReport('stub');
    t.end();
});
