import {createTest} from '@putout/test';
import * as variables from '@putout/plugin-variables';
import progress from '../lib/frame.js';

const rmVars = variables.rules['remove-unused'];

const test = createTest(import.meta.url, {
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
