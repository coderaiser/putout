import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-node-prefix-to-mock-require', plugin],
    ],
});

test('tape: add-node-prefix-to-mock-require: report', (t) => {
    t.report('add-node-prefix-to-mock-require', `Add 'node:' prefix: 'fs/promises' -> 'node:fs/promises'`);
    t.end();
});

test('tape: add-node-prefix-to-mock-require: transform', (t) => {
    t.transform('add-node-prefix-to-mock-require');
    t.end();
});

test('tape: add-node-prefix-to-mock-require: transform: mock-import', (t) => {
    t.transform('mock-import');
    t.end();
});
