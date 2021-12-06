'use strict';

const json = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-unused-variables': require('@putout/plugin-remove-unused-variables'),
});

test('formatter: json', async ({format}) => {
    await format(json, 'var');
});

test('formatter: json: no', async ({format}) => {
    await format(json, 'no');
});

test('formatter: json: many', async ({formatMany}) => {
    await formatMany(json, ['var', 'var']);
});

