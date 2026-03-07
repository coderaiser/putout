import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['check-type-passed-to-type-checker', plugin],
    ],
});

test('printer: check-type-passed-to-type-checker: report', (t) => {
    t.report('check-type-passed-to-type-checker', `Unknown type detected: 'WrongType'`);
    t.end();
});

test('printer: check-type-passed-to-type-checker: transform', (t) => {
    t.transform('check-type-passed-to-type-checker');
    t.end();
});

test('printer: check-type-passed-to-type-checker: no report: selector', (t) => {
    t.noReport('selector');
    t.end();
});

test('printer: check-type-passed-to-type-checker: no report: comment-block', (t) => {
    t.noReport('comment-block');
    t.end();
});
