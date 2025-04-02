import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-export-from', plugin],
    ],
});

test('esm: apply-export-from: report', (t) => {
    t.report('apply-export-from', `Use 'export *' instead of 'import/export'`);
    t.end();
});

test('esm: apply-export-from: transform', (t) => {
    t.transform('apply-export-from');
    t.end();
});
