import {createTest} from '@putout/test';
import rmVars from '@putout/plugin-remove-unused-variables';

import dump from '../lib/dump.js';
const test = createTest(import.meta.url, {
    'remove-unused-variables': rmVars,
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

