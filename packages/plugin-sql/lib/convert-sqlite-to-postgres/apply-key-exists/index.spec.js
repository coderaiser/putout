import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-key-exists', plugin],
    ],
});

test('sql: apply-key-exists: report', (t) => {
    t.report('apply-key-exists', `Use 'IS NOT NULL' instead of '?'`);
    t.end();
});

test('sql: apply-key-exists: transform', (t) => {
    t.transform('apply-key-exists');
    t.end();
});
