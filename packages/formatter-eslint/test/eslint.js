'use strict';

const eslint = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-unused-variables': require('@putout/plugin-remove-unused-variables'),
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

