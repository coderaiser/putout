import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-missing-for-template', plugin],
    ],
});

test('parens: add-missing-for-template: report', (t) => {
    t.report('add-missing-for-template', `Add missing parens: invalid tagged template on optional chain`);
    t.end();
});

test('parens: add-missing-for-template: transform', (t) => {
    t.transform('add-missing-for-template');
    t.end();
});

test('putout: add-missing-parens: no report: no-chain', (t) => {
    t.noReport('no-chain');
    t.end();
});

test('putout: add-missing-parens: transform: non-null', (t) => {
    t.transform('non-null');
    t.end();
});
