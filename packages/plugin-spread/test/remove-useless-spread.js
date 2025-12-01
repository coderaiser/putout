import {createTest} from '@putout/test';
import * as removeUselessSpread from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-spread', removeUselessSpread],
    ],
});

test('plugin-remove-useless-spread: report: for-of', (t) => {
    t.report('for-of', `Avoid useless spread '...'`);
    t.end();
});

test('plugin-remove-useless-spread: transform: for-of', (t) => {
    t.transform('for-of');
    t.end();
});

test('plugin-remove-useless-spread: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-remove-useless-spread: transform: nested', (t) => {
    t.transform('nested');
    t.end();
});
