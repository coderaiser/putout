import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['extract-result-from-assertion', plugin],
    ],
});

test('tape: extract-result-from-assertion: report', (t) => {
    t.report('extract-result-from-assertion', `Extract result from assertion`);
    t.end();
});

test('tape: extract-result-from-assertion: transform', (t) => {
    t.transform('extract-result-from-assertion');
    t.end();
});

test('tape: extract-result-from-assertion: transform: expected', (t) => {
    t.transform('expected');
    t.end();
});

test('tape: extract-result-from-assertion: no report: called-with', (t) => {
    t.noReport('called-with');
    t.end();
});

test('tape: extract-result-from-assertion: no report: call-count', (t) => {
    t.noReport('call-count');
    t.end();
});

test('tape: extract-result-from-assertion: no report: result-member', (t) => {
    t.noReport('result-member');
    t.end();
});

test('tape: extract-result-from-assertion: no report: declared', (t) => {
    t.noReport('declared');
    t.end();
});

test('tape: extract-result-from-assertion: transform: no-result', (t) => {
    t.transform('no-result');
    t.end();
});

test('tape: extract-result-from-assertion: transform: no-expected', (t) => {
    t.transform('no-expected');
    t.end();
});

test('tape: extract-result-from-assertion: transform: no-t', (t) => {
    t.transform('no-t');
    t.end();
});
