import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-sequance-to-serial', plugin],
    ],
});

test('sql: convert-sequance-to-serial: report', (t) => {
    t.report('convert-sequance-to-serial', `Use 'serial' instead of 'sequence'`);
    t.end();
});

test('sql: convert-sequance-to-serial: transform', (t) => {
    t.transform('convert-sequance-to-serial');
    t.end();
});
