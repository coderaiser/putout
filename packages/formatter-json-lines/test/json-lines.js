import {createTest} from '@putout/test';
import * as variables from '@putout/plugin-variables';
import jsonLines from '../lib/json-lines.js';

const rmVars = variables.rules['remove-unused'];

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
