import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-nodejs', plugin],
    ],
});

test('putout-config: apply-nodejs: report', (t) => {
    t.report('apply-nodejs', `Rename property: 'strict-mode/add-missing' -> 'nodejs/add-missing-strict-mode'`);
    t.end();
});

test('putout-config: apply-nodejs: transform', (t) => {
    t.transform('apply-nodejs');
    t.end();
});

test('putout-config: apply-nodejs: transform: convert-esm-to-commonjs', (t) => {
    t.transform('convert-esm-to-commonjs');
    t.end();
});

test('putout-config: apply-nodejs: transform: v24', (t) => {
    t.transform('v24');
    t.end();
});
