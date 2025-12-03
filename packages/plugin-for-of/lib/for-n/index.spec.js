import {createTest} from '@putout/test';
import * as destructuring from '@putout/plugin-destructuring';
import * as variables from '@putout/plugin-variables';
import * as forN from './index.js';

const removeUnusedVariables = variables.rules['remove-unused'];
const removeUselessArguments = destructuring.rules['remove-useless-arguments'];

const test = createTest(import.meta.url, {
    plugins: [
        ['for-of/n', forN],
    ],
});

test('plugin-for-of: for-n: no report: no-length', (t) => {
    t.noReport('no-length');
    t.end();
});

test('plugin-for-of: for-n: no transform: no-length', (t) => {
    t.noTransform('no-length');
    t.end();
});

test('plugin-for-of: for-n: transform: used-length', (t) => {
    t.transform('used-length');
    t.end();
});

test('plugin-for-of: for-n: for-no transform: for-more', (t) => {
    t.noTransform('for-more');
    t.end();
});

test('plugin-for-of: for-n: for-no transform: no-name', (t) => {
    t.noTransform('no-name');
    t.end();
});

test('plugin-for-of: for-n: transform: remove-useless-arguments', (t) => {
    t.transform('remove-useless-arguments', {
        removeUnusedVariables,
        removeUselessArguments,
    });
    t.end();
});

test('plugin-for-of: for-n: for-no transform: for-to-n-wrong-prev', (t) => {
    t.noTransform('for-to-n-wrong-prev');
    t.end();
});
