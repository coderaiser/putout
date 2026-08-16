import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-sequence-to-serial', plugin],
    ],
});

test('sql: convert-sequence-to-serial: report', (t) => {
    t.report('convert-sequence-to-serial', `Use 'serial' instead of 'sequence'`);
    t.end();
});

test('sql: convert-sequence-to-serial: transform', (t) => {
    t.transform('convert-sequence-to-serial');
    t.end();
});
