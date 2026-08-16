import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-with-to-sequential', plugin],
    ],
});

test('convert-postgres-to-sqlite: convert-with-to-sequential: report', (t) => {
    t.report('convert-with-to-sequential', `Use sequential queries instead of 'WITH'`);
    t.end();
});

test('convert-postgres-to-sqlite: convert-with-to-sequential: transform', (t) => {
    t.transform('convert-with-to-sequential');
    t.end();
});
