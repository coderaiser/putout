import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['from-while', plugin],
    ],
});

test('for-of: from-while: report', (t) => {
    t.report('from-while', `Use 'for..of' instead of 'while'`);
    t.end();
});

test('for-of: from-while: transform', (t) => {
    t.transform('from-while');
    t.end();
});

test('for-of: from-while: no report: no-prev', (t) => {
    t.noReport('no-prev');
    t.end();
});

test('for-of: from-while: no report: no-inc', (t) => {
    t.noReport('no-inc');
    t.end();
});

test('for-of: from-while: no report: not-block', (t) => {
    t.noReport('not-block');
    t.end();
});

test('for-of: from-while: no report: no-assign', (t) => {
    t.noReport('no-assign');
    t.end();
});
