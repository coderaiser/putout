import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-generate-series-to-with-recursive', plugin],
    ],
});

test('sql: convert-generate-series-to-with-recursive: report', (t) => {
    t.report('convert-generate-series-to-with-recursive', `Use 'WITH RECURSIVE'`);
    t.end();
});

test('sql: convert-generate-series-to-with-recursive: transform', (t) => {
    t.transform('convert-generate-series-to-with-recursive');
    t.end();
});
