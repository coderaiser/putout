import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-auto-increment', plugin],
    ],
});

test('convert-postgresql-to-sqlite: apply-auto-increment: report', (t) => {
    t.report('apply-auto-increment', `Use 'AUTOINCREMENT'`);
    t.end();
});

test('convert-postgresql-to-sqlite: apply-auto-increment: transform: always', (t) => {
    t.transform('apply-auto-increment');
    t.end();
});

test('convert-postgresql-to-sqlite: apply-auto-increment: transform: identity', (t) => {
    t.transform('identity');
    t.end();
});

test('convert-postgresql-to-sqlite: apply-auto-increment: transform: identity-by-default', (t) => {
    t.transform('identity-by-default');
    t.end();
});
