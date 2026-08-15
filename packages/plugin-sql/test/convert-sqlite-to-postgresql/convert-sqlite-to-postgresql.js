import {createTest} from '@putout/test';
import * as sql from '../../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'sql/convert-sqlite-to-postgresql/convert-last-insert-rowid-to-returnning-id': 'on',
    },
    plugins: [
        ['sql', sql],
    ],
});

test('plugin-sql: transform: convert-sqlite-to-postgresql: convert-last-insert-rowid-to-returnning-id', (t) => {
    t.transform('convert-last-insert-rowid-to-returnning-id');
    t.end();
});
