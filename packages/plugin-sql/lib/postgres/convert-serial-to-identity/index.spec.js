import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-serial-to-identity', plugin],
    ],
});

test('sql: convert-serial-to-identity: report', (t) => {
    t.report('convert-serial-to-identity', `Use 'IDENTITY' instead of 'SERIAL'`);
    t.end();
});

test('sql: convert-serial-to-identity: transform', (t) => {
    t.transform('convert-serial-to-identity');
    t.end();
});
