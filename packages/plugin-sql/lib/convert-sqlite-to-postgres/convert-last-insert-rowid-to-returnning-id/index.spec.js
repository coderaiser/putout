import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-last-insert-rowid-to-returning-id', plugin],
    ],
});

test('sql: convert-last-insert-rowid-to-returning-id: report', (t) => {
    t.report('convert-last-insert-rowid-to-returning-id', `Use 'returning id', instead of 'lastInsertRowid()'`);
    t.end();
});

test('sql: convert-last-insert-rowid-to-returning-id: transform', (t) => {
    t.transform('convert-last-insert-rowid-to-returning-id');
    t.end();
});
