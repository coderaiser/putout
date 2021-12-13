import strictMode from '@putout/plugin-strict-mode';
import rmUnused from '@putout/plugin-remove-unused-variables';

import codeframe from '../lib/codeframe.js';
import {createTest} from '@putout/test';

const test = createTest(import.meta.url, {
    'remove-unused-variables': rmUnused,
});

const testStrict = createTest(import.meta.url, {
    'strict-mode': strictMode,
});

test('formatter: codeframe', async ({format}) => {
    await format(codeframe, 'var');
});

test('formatter: codeframe: no', async ({noFormat}) => {
    await noFormat(codeframe, 'no');
});

test('formatter: codeframe: many', async ({formatMany}) => {
    await formatMany(codeframe, ['var', 'var']);
});

testStrict('formatter: zero', async ({format}) => {
    await format(codeframe, 'strict');
});
