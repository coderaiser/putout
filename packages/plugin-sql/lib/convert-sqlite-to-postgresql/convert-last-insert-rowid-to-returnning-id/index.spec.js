import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-last-insert-rowid-to-returnning-id', plugin],
    ],
});

test('sql: convert-last-insert-rowid-to-returnning-id: report', (t) => {
    t.report('convert-last-insert-rowid-to-returnning-id', `Use 'returning id', instead of 'lastInsertRowid()'`);
    t.end();
});

test('sql: convert-last-insert-rowid-to-returnning-id: transform', (t) => {
    t.transform('convert-last-insert-rowid-to-returnning-id');
    t.end();
});
