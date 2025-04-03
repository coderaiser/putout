import {createTest} from '@putout/test';
import * as plugin from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['parens', plugin],
    ],
});

test('putout: parens: transform: add-missing-for-template', (t) => {
    t.transform('add-missing-for-template');
    t.end();
});

test('putout: parens: transform: add-missing-for-await', (t) => {
    t.transform('add-missing-for-await');
    t.end();
});

test('plugin-parens: transform: add-missing-for-assign', (t) => {
    t.transform('add-missing-for-assign');
    t.end();
});

test('plugin-parens: transform: remove-useless-for-await', (t) => {
    t.transform('remove-useless-for-await');
    t.end();
});

test('plugin-parens: transform: remove-useless-for-params', (t) => {
    t.transform('remove-useless-for-params');
    t.end();
});
