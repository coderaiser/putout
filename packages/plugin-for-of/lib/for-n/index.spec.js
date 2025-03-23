import {createRequire} from 'node:module';
import {createTest} from '@putout/test';
import * as forN from './index.js';

const require = createRequire(import.meta.url);

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
        'remove-unused-variables': require('@putout/plugin-remove-unused-variables'),
        'remove-useless-arguments': require('@putout/plugin-remove-useless-arguments'),
    });
    t.end();
});

test('plugin-for-of: for-n: for-no transform: for-to-n-wrong-prev', (t) => {
    t.noTransform('for-to-n-wrong-prev');
    t.end();
});
