import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['variables/apply-declarations-order', plugin],
    ],
});

test('variables: apply-declarations-order: report', (t) => {
    t.report('apply-declarations-order', `Apply declarations order`);
    t.end();
});

test('variables: apply-declarations-order: transform', (t) => {
    t.transform('apply-declarations-order');
    t.end();
});

test('variables: apply-declarations-order: no report: identifier', (t) => {
    t.noReport('identifier');
    t.end();
});

test('variables: apply-declarations-order: no report: literal', (t) => {
    t.noReport('literal');
    t.end();
});
