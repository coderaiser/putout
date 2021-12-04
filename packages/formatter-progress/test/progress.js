import {createCommons} from 'simport';

import rmVars from '@putout/plugin-remove-unused-variables';
import putoutTest from '@putout/test';

import progress from '../lib/progress.js';

const {__dirname} = createCommons(import.meta.url);

const test = putoutTest(__dirname, {
    'remove-unused-variables': rmVars,
});

test('formatter: progress', async ({format}) => {
    await format(progress, 'var');
});

test('formatter: progress: no', async ({format}) => {
    await format(progress, 'no');
});

test('formatter: progress: many', async ({formatMany}) => {
    await formatMany(progress, ['var', 'var']);
});

test('formatter: progress: minCount', async ({format}) => {
    await format(progress, 'min-count', {
        minCount: 10,
    });
});

