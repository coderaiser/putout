import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-trigger-to-function', plugin],
    ],
});

test('putout: plugin-sql: convert-sqlite-to-postgres: convert-trigger-to-function: report', (t) => {
    t.report('convert-trigger-to-function', `Move body of trigger to function for PostgreSQL`);
    t.end();
});

test('putout: plugin-sql: convert-sqlite-to-postgres: convert-trigger-to-function: transform', (t) => {
    t.transform('convert-trigger-to-function');
    t.end();
});

test('putout: plugin-sql: convert-sqlite-to-postgres: convert-trigger-to-function: transform: insert', (t) => {
    t.transform('insert');
    t.end();
});

test('putout: plugin-sql: convert-sqlite-to-postgres: convert-trigger-to-function: transform: for-each-row', (t) => {
    t.transform('for-each-row');
    t.end();
});

test('putout: plugin-sql: convert-sqlite-to-postgres: convert-trigger-to-function: transform: if-not-exists', (t) => {
    t.transform('if-not-exists');
    t.end();
});

test('putout: plugin-sql: convert-sqlite-to-postgres: convert-trigger-to-function: no transform: execute', (t) => {
    t.noTransform('execute');
    t.end();
});

test('putout: plugin-sql: convert-sqlite-to-postgres: convert-trigger-to-function: no transform: not-in-array', (t) => {
    t.noTransform('not-in-array');
    t.end();
});
