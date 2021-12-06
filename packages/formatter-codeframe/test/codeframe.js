'use strict';

const codeframe = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-unused-variables': require('@putout/plugin-remove-unused-variables'),
});

const testStrict = require('@putout/test')(__dirname, {
    'strict-mode': require('@putout/plugin-strict-mode'),
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
