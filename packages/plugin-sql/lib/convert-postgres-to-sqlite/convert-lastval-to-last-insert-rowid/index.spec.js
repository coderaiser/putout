import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-lastval-to-last-insert-rowid', plugin],
    ],
});

test('sql: convert-lastval-to-last-insert-rowid: report', (t) => {
    t.report('convert-lastval-to-last-insert-rowid', `Use 'lastInsertRowid' instead of 'lastval'`);
    t.end();
});

test('sql: convert-lastval-to-last-insert-rowid: transform', (t) => {
    t.transform('convert-lastval-to-last-insert-rowid');
    t.end();
});
