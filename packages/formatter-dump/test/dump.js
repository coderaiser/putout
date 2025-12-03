import {createTest} from '@putout/test';
import * as variables from '@putout/plugin-variables';
import dump from '../lib/dump.js';

const rmVars = variables.rules['remove-unused'];

const test = createTest(import.meta.url, {
    'remove-unused-variables': rmVars,
});

test('formatter: dump', async ({format}) => {
    await format(dump, 'var');
});

test('formatter: dump: no', async ({noFormat}) => {
    await noFormat(dump, 'no');
});

test('formatter: dump: couple files', async ({formatMany}) => {
    await formatMany(dump, ['var', 'var']);
});

test('formatter: dump: errors', async ({format}) => {
    await format(dump, 'errors');
});
