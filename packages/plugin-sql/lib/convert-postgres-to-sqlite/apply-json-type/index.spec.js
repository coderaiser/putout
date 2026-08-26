import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-is-not-null', plugin],
    ],
});

test('sql: apply-is-not-null: report', (t) => {
    t.report('apply-is-not-null', `Use 'IS NOT NULL' instead of '?'`);
    t.end();
});

test('sql: apply-is-not-null: transform', (t) => {
    t.transform('apply-is-not-null');
    t.end();
});
