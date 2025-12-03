import * as variables from '@putout/plugin-variables';
import {createTest} from '@putout/test';
import progress from '../lib/progress.js';

const rmVars = variables.rules['remove-unused'];

const test = createTest(import.meta.url, {
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
