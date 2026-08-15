import {createTest} from '@putout/test';
import * as sql from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['sql', sql],
    ],
});

test('plugin-sql: transform: apply-count', (t) => {
    t.transform('apply-count');
    t.end();
});

test('plugin-sql: no report: convert-sqlite-to-postgresql: convert-last-insert-rowid-to-returnning-id', (t) => {
    t.noReport('convert-last-insert-rowid-to-returnning-id');
    t.end();
});

test('plugin-sql: no report: convert-sqlite-to-postgresql: convert-auto-increment-to-identitiy', (t) => {
    t.noReport('convert-auto-increment-to-identitiy');
    t.end();
});

