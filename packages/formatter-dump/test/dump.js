import {createCommons} from 'simport';

const {
    __dirname,
    require,
} = createCommons(import.meta.url);

import dump from '../lib/dump.js';

import createTest from '@putout/test';

const test = createTest(__dirname, {
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

