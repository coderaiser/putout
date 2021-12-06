'use strict';

const progress = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-unused-variables': require('@putout/plugin-remove-unused-variables'),
});

test('formatter: frame', async ({format}) => {
    await format(progress, 'var');
});

test('formatter: frame: no', async ({format}) => {
    await format(progress, 'no');
});

test('formatter: frame: many', async ({formatMany}) => {
    await formatMany(progress, ['var', 'var']);
});

