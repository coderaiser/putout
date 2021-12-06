'use strict';

const dump = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-unused-variables': require('@putout/plugin-remove-unused-variables'),
});

test('formatter: dump', async ({format}) => {
    await format(dump, 'var');
});

test('formatter: dump: no', async ({noFormat}) => {
    await noFormat(dump, 'no');
});

test('formatter: dump: many', async ({formatMany}) => {
    await formatMany(dump, ['var', 'var']);
});

