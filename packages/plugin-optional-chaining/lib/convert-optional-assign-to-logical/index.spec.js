import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['optional-chaining/convert-optional-assign-to-logical', plugin],
    ],
});

test('optional-chaining: convert-optional-assign-to-logical: assign: report', (t) => {
    t.report('assign', `Use Logical Expression ('a && a.b = c') instead of Optional Chaining ('a?.b = c')`);
    t.end();
});

test('optional-chaining: convert-optional-assign-to-logical: assign: transform', (t) => {
    t.transform('assign');
    t.end();
});

test('optional-chaining: convert-optional-assign-to-logical: assign: call', (t) => {
    t.noTransform('call');
    t.end();
});

test('optional-chaining: convert-optional-assign-to-logical: assign: no report: right', (t) => {
    t.noReport('right');
    t.end();
});
