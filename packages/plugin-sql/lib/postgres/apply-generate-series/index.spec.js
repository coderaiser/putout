import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-generate-series', plugin],
    ],
});

test('sql: apply-generate-series: report', (t) => {
    t.report('apply-generate-series', `Use 'generate_series()'`);
    t.end();
});

test('sql: apply-generate-series: transform', (t) => {
    t.transform('apply-generate-series');
    t.end();
});
