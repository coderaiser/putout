import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-const-to-import', plugin],
    ],
});

test('esm: convert-const-to-import: report', (t) => {
    t.report('convert-const-to-import', `Use 'import' instead of 'const'`);
    t.end();
});

test('esm: convert-const-to-import: transform', (t) => {
    t.transform('convert-const-to-import');
    t.end();
});
