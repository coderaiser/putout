import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-type-check', plugin],
    ],
});

test('putout: apply-type-check: report', (t) => {
    t.report('apply-type-check', `Use 'is-' function to check type`);
    t.end();
});

test('putout: apply-type-check: transform', (t) => {
    t.transform('apply-type-check');
    t.end();
});

test('putout: apply-type-check: no report: empty', (t) => {
    t.noReport('empty');
    t.end();
});

test('putout: apply-type-check: no report: arrow', (t) => {
    t.noReport('arrow');
    t.end();
});
