import {createTest} from '@putout/test';
import * as sql from '../../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'sql/convert-postgres-to-sqlite': 'on',
        'sql/postgres': 'off',
    },
    plugins: [
        ['sql', sql],
    ],
});

test('plugin-sql: transform: convert-postgres-to-sqlite: convert-with-to-sequential', (t) => {
    t.transform('convert-with-to-sequential');
    t.end();
});

test('plugin-sql: transform: convert-postgres-to-sqlite: apply-auto-increment', (t) => {
    t.transform('apply-auto-increment');
    t.end();
});

test('plugin-sql: transform: convert-generate-series-to-with-recursive', (t) => {
    t.transform('convert-generate-series-to-with-recursive');
    t.end();
});

test('plugin-sql: transform: apply-json-extract', (t) => {
    t.transform('apply-json-extract');
    t.end();
});

test('plugin-sql: transform: apply-json-type', (t) => {
    t.transform('apply-json-type');
    t.end();
});
