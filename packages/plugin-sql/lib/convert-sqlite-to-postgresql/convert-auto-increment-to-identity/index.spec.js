import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-auto-increment-to-identity', plugin],
    ],
});

test('sql: convert-auto-increment-to-identity: report', (t) => {
    t.report('convert-auto-increment-to-identity', `Replace INTEGER + autoIncrement with identity for PostgreSQL`);
    t.end();
});

test('sql: convert-auto-increment-to-identity: transform', (t) => {
    t.transform('convert-auto-increment-to-identity');
    t.end();
});
