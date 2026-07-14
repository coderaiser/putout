import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['move-out-result-from-assertion', plugin],
    ],
});

test('tape: move-out-result-from-assertion: report', (t) => {
    t.report('move-out-result-from-assertion', `Move out result from asssertion`);
    t.end();
});

test('tape: move-out-result-from-assertion: transform', (t) => {
    t.transform('move-out-result-from-assertion');
    t.end();
});

test('tape: move-out-result-from-assertion: transform: expected', (t) => {
    t.transform('expected');
    t.end();
});

test('tape: move-out-result-from-assertion: no report: called-with', (t) => {
    t.noReport('called-with');
    t.end();
});

test('tape: move-out-result-from-assertion: no report: call-count', (t) => {
    t.noReport('call-count');
    t.end();
});

test('tape: move-out-result-from-assertion: no report: result-member', (t) => {
    t.noReport('result-member');
    t.end();
});

test('tape: move-out-result-from-assertion: no report: declared', (t) => {
    t.noReport('declared');
    t.end();
});

test('tape: move-out-result-from-assertion: transform: no-result', (t) => {
    t.transform('no-result');
    t.end();
});

test('tape: move-out-result-from-assertion: transform: no-expected', (t) => {
    t.transform('no-expected');
    t.end();
});
