import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-auto-increment-to-identitiy', plugin],
    ],
});

test('sql: convert-auto-increment-to-identitiy: report', (t) => {
    t.report('convert-auto-increment-to-identitiy', `Replace INTEGER + autoIncrement with identity for PostgreSQL`);
    t.end();
});

test('sql: convert-auto-increment-to-identitiy: transform', (t) => {
    t.transform('convert-auto-increment-to-identitiy');
    t.end();
});
