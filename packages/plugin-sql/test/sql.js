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

test('plugin-sql: no report: convert-sqlite-to-postgresql: convert-last-insert-rowid-to-returning-id', (t) => {
    t.noReport('convert-last-insert-rowid-to-returning-id');
    t.end();
});

test('plugin-sql: no report: convert-sqlite-to-postgresql: convert-auto-increment-to-identity', (t) => {
    t.noReport('convert-auto-increment-to-identity');
    t.end();
});

test('plugin-sql: no report: convert-sqlite-to-postgresql: convert-with-to-sequential', (t) => {
    t.noReport('convert-with-to-sequential');
    t.end();
});

test('plugin-sql: transform: convert-sequance-to-serial', (t) => {
    t.transform('convert-sequance-to-serial');
    t.end();
});
