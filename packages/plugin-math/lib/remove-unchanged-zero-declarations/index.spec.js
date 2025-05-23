import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-unchanged-zero-declarations', plugin],
    ],
});

test('math: remove-unchanged-zero-declarations: report', (t) => {
    t.report('remove-unchanged-zero-declarations', 'Avoid unchanged zero declarations');
    t.end();
});

test('math: remove-unchanged-zero-declarations: transform', (t) => {
    t.transform('remove-unchanged-zero-declarations');
    t.end();
});

test('math: remove-unchanged-zero-declarations: no report: no-init', (t) => {
    t.noReport('no-init');
    t.end();
});

test('math: remove-unchanged-zero-declarations: no report: exported', (t) => {
    t.noReport('exported');
    t.end();
});

test('math: remove-unchanged-zero-declarations: no report: call', (t) => {
    t.noReport('call');
    t.end();
});

test('math: remove-unchanged-zero-declarations: no report: return', (t) => {
    t.noReport('return');
    t.end();
});

test('math: remove-unchanged-zero-declarations: no report: not-referenced', (t) => {
    t.noReport('not-referenced');
    t.end();
});

test('math: remove-unchanged-zero-declarations: no report: assert', (t) => {
    t.noReport('assert');
    t.end();
});
