import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-count', plugin],
    ],
});

test('sql: apply-count: report', (t) => {
    t.report('apply-count', `Use 'COUNT(*)' instead of 'COUNT(1)'`);
    t.end();
});

test('sql: apply-count: transform', (t) => {
    t.transform('apply-count');
    t.end();
});
