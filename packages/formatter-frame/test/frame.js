import createTest from '@putout/test';
import {createCommons} from 'simport';
import rmVars from '@putout/plugin-remove-unused-variables';

const {__dirname} = createCommons(import.meta.url);

import progress from '../lib/frame.js';

const test = createTest(__dirname, {
    'remove-unused-variables': rmVars,
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

