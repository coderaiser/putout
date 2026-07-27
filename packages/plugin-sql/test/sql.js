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
