import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-switch-to-if', plugin],
    ],
});

test('conditions: convert-switch-to-if: report', (t) => {
    t.report('convert-switch-to-if', `Use 'if' instead of 'switch'`);
    t.end();
});

test('conditions: convert-switch-to-if: transform', (t) => {
    t.transform('convert-switch-to-if');
    t.end();
});

test('putout: convert-switch-to-if: no report: no-return', (t) => {
    t.noReport('no-return');
    t.end();
});

test('putout: convert-switch-to-if: transform: default', (t) => {
    t.transform('default');
    t.end();
});
