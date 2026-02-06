import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-default-import', plugin],
    ],
});

test('esm: apply-default-import: report', (t) => {
    t.report('apply-default-import', `Use default import`);
    t.end();
});

test('esm: apply-default-import: transform', (t) => {
    t.transform('apply-default-import');
    t.end();
});
