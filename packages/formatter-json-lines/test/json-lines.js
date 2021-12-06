'use strict';

const jsonLines = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-unused-variables': require('@putout/plugin-remove-unused-variables'),
});

test('formatter: json-lines', async ({format}) => {
    await format(jsonLines, 'var');
});

test('formatter: json-lines: no', async ({format}) => {
    await format(jsonLines, 'no');
});

test('formatter: json-lines: many', async ({formatMany}) => {
    await formatMany(jsonLines, ['var', 'var']);
});

