import {createTest} from '@putout/test';
import rmVars from '@putout/plugin-remove-unused-variables';
import jsonLines from '../lib/json-lines.js';

const test = createTest(import.meta.url, {
    'remove-unused-variables': rmVars,
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
