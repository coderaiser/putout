'use strict';

const stream = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-unused-variables': require('@putout/plugin-remove-unused-variables'),
});

test('formatter: stream', async ({format}) => {
    await format(stream, 'var');
});

test('formatter: stream: no', async ({noFormat}) => {
    await noFormat(stream, 'no');
});

test('formatter: stream: many', async ({formatMany}) => {
    await formatMany(stream, ['var', 'var']);
});

