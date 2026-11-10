import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['reverse-comparison-in-type-checker', plugin],
    ],
});

test('printer: reverse-comparison-in-type-checker: report', (t) => {
    t.report('reverse-comparison-in-type-checker', `Reverse comparison`);
    t.end();
});

test('printer: reverse-comparison-in-type-checker: transform', (t) => {
    t.transform('reverse-comparison-in-type-checker');
    t.end();
});

test('printer: reverse-comparison-in-type-checker: no report: equal', (t) => {
    t.noReport('equal');
    t.end();
});
