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

test('plugin-sql: no report: convert-sqlite-to-postgresql: apply-auto-increment', (t) => {
    t.noReport('apply-auto-increment');
    t.end();
});

test('plugin-sql: transform: convert-sequence-to-serial', (t) => {
    t.transform('convert-sequence-to-serial');
    t.end();
});

test('plugin-sql: transform: convert-serial-to-identity', (t) => {
    t.transform('convert-serial-to-identity');
    t.end();
});

test('plugin-sql: no report: convert-lastval-to-last-insert-rowid', (t) => {
    t.noReport('convert-lastval-to-last-insert-rowid');
    t.end();
});

test('plugin-sql: transform: apply-generate-series', (t) => {
    t.transform('apply-generate-series');
    t.end();
});
