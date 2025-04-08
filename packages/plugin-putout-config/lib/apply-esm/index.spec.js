import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-esm', plugin],
    ],
});

test('putout-config: apply-esm: report', (t) => {
    t.report('apply-esm', `Rename property: 'convert-assert-to-with' -> 'esm/convert-assert-to-with'`);
    t.end();
});

test('putout-config: apply-esm: transform', (t) => {
    t.transform('apply-esm');
    t.end();
});

test('putout-config: apply-esm: transform: v40', (t) => {
    t.transform('v40');
    t.end();
});
