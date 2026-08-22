import {createTest} from '@putout/test';
import * as sql from '../../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'sql/convert-sqlite-to-postgres': 'on',
    },
    plugins: [
        ['sql', sql],
    ],
});

test('plugin-sql: transform: convert-sqlite-to-postgresql: apply-generate-series', (t) => {
    t.transform('apply-generate-series');
    t.end();
});

test('plugin-sql: transform: convert-sqlite-to-postgresql: convert-last-insert-rowid-to-returning-id', (t) => {
    t.transform('convert-last-insert-rowid-to-returning-id');
    t.end();
});

test('plugin-sql: transform: convert-sqlite-to-postgresql: convert-auto-increment-to-identity', (t) => {
    t.transform('convert-auto-increment-to-identity');
    t.end();
});
