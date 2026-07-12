import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['insert-test-dts', plugin],
    ],
});

test('madrun: insert-test-dts: report', (t) => {
    t.report('insert-test-dts', `Insert 'test:dts'`);
    t.end();
});

test('madrun: insert-test-dts: transform', (t) => {
    t.transform('insert-test-dts');
    t.end();
});

test('madrun: insert-test-dts: no report: spread', (t) => {
    t.noReport('spread');
    t.end();
});
