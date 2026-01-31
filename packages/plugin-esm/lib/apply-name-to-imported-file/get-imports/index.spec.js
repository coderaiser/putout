import {createTest} from '@putout/test';
import * as plugin from '#get-default-imports';

const test = createTest(import.meta.url, {
    plugins: [
        ['get-imports', plugin],
    ],
});

test('esm: get-imports: report', (t) => {
    t.report('get-imports', `a <- ./a.js <- import`);
    t.end();
});

test('esm: get-imports: transform', (t) => {
    t.transform('get-imports');
    t.end();
});

test('esm: get-imports: report: export', (t) => {
    t.report('export', 'read <- ./vfs/read/index.js <- export');
    t.end();
});
