import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['get-imports', plugin],
    ],
});

test('putout: esm: resolve-imported-file: get-imports: report: get-imports', (t) => {
    t.report('get-imports', `./a`);
    t.end();
});

test('putout: esm: resolve-imported-file: get-imports: report: dynamic', (t) => {
    t.report('dynamic', `./a`);
    t.end();
});

test('putout: esm: resolve-imported-file: get-imports: no report: dynamic-identifier', (t) => {
    t.noReport('dynamic-identifier');
    t.end();
});

test('putout: esm: resolve-imported-file: get-imports: no report: external', (t) => {
    t.noReportCode(`import a from 'a'`);
    t.end();
});

test('putout: esm: resolve-imported-file: get-imports: no report: js', (t) => {
    t.noReportCode(`import a from './a.js'`);
    t.end();
});

test('putout: esm: resolve-imported-file: get-imports: report: export from: *', (t) => {
    t.reportCode(`export * from './a'`, './a');
    t.end();
});

test('putout: esm: resolve-imported-file: get-imports: report: export from', (t) => {
    t.reportCode(`export {a} from './a'`, './a');
    t.end();
});

test('putout: esm: resolve-imported-file: no transform: get-imports', (t) => {
    t.noTransform('get-imports');
    t.end();
});
