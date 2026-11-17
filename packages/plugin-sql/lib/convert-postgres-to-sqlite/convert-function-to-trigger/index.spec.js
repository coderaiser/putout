import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-function-to-trigger', plugin],
    ],
});

test('putout: plugin-sql: convert-postgres-to-sqlite: convert-function-to-trigger: report', (t) => {
    t.report('convert-function-to-trigger', `Move body of function to trigger for SQLite`);
    t.end();
});

test('putout: plugin-sql: convert-postgres-to-sqlite: convert-function-to-trigger: transform', (t) => {
    t.transform('convert-function-to-trigger');
    t.end();
});

test('putout: plugin-sql: convert-postgres-to-sqlite: convert-function-to-trigger: transform: return-new', (t) => {
    t.transform('return-new');
    t.end();
});

test('putout: plugin-sql: convert-postgres-to-sqlite: convert-function-to-trigger: transform: two-triggers', (t) => {
    t.transform('two-triggers');
    t.end();
});

test('putout: plugin-sql: convert-postgres-to-sqlite: convert-function-to-trigger: no transform: body', (t) => {
    t.noTransform('body');
    t.end();
});

test('putout: plugin-sql: convert-postgres-to-sqlite: convert-function-to-trigger: no transform: no-function', (t) => {
    t.noTransform('no-function');
    t.end();
});

test('putout: plugin-sql: convert-postgres-to-sqlite: convert-function-to-trigger: no transform: not-execute', (t) => {
    t.noTransform('not-execute');
    t.end();
});

test('putout: plugin-sql: convert-postgres-to-sqlite: convert-function-to-trigger: no transform: not-in-array', (t) => {
    t.noTransform('not-in-array');
    t.end();
});

test('putout: plugin-sql: convert-postgres-to-sqlite: convert-function-to-trigger: transform: or-replace', (t) => {
    t.transform('or-replace');
    t.end();
});
