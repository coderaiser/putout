import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['check-if-success-possible-in-type-checker', plugin],
    ],
});

test('printer: check-if-success-possible-in-type-checker: report', (t) => {
    t.report('check-if-success-possible-in-type-checker', `Success path ('+') is absent in Type Checker, all branches routes to fail ('-')`);
    t.end();
});

test('printer: check-if-success-possible-in-type-checker: no transform', (t) => {
    t.noTransform('check-if-success-possible-in-type-checker');
    t.end();
});

test('printer: check-if-success-possible-in-type-checker: no report: wrong-name', (t) => {
    t.noReport('wrong-name');
    t.end();
});
