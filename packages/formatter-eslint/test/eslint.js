import {createTest} from '@putout/test';
import rmUnused from '@putout/plugin-remove-unused-variables';

import eslint from '../lib/eslint.js';

const test = createTest(import.meta.url, {
    'remove-unused-variables': rmUnused,
});

test('formatter: eslint', async ({format}) => {
    await format(eslint, 'var');
});

test('formatter: eslint: eslint-formatter', async ({format}) => {
    process.env.ESLINT_FORMATTER = 'compassion';
    
    await format(eslint, 'eslint-formatter');
    
    delete process.env.ESLINT_FORMATTER;
});

test('formatter: eslint: no', async ({noFormat}) => {
    await noFormat(eslint, 'no');
});

test('formatter: eslint: many', async ({formatMany}) => {
    await formatMany(eslint, ['var', 'var']);
});

