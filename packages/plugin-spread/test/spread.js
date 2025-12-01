import {createTest} from '@putout/test';
import * as removeUselessSpread from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-spread', removeUselessSpread],
    ],
});

test('plugin-remove-useless-spread: report: remove-useless-array', (t) => {
    t.report('remove-useless-array', `Avoid useless spread '...'`);
    t.end();
});

test('plugin-remove-useless-spread: transform: remove-useless-array', (t) => {
    t.transform('remove-useless-array');
    t.end();
});

test('plugin-remove-useless-spread: transform: remove-useless-object', (t) => {
    t.transform('remove-useless-object');
    t.end();
});

test('plugin-remove-useless-spread: transform: simplify-nested', (t) => {
    t.transform('simplify-nested');
    t.end();
});

test('plugin-remove-useless-spread: transform: convert-apply-to-spread', (t) => {
    t.transform('convert-apply-to-spread');
    t.end();
});

test('plugin-remove-useless-spread: transform: convert-object-assign-to-merge-spread', (t) => {
    t.transform('convert-object-assign-to-merge-spread');
    t.end();
});
