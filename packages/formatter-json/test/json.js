import {createTest} from '@putout/test';
import rmVars from '@putout/plugin-remove-unused-variables';

import json from '../lib/json.js';

const test = createTest(import.meta.url, {
    'remove-unused-variables': rmVars,
});

test('formatter: json', async ({format}) => {
    await format(json, 'var');
});

test('formatter: json: no', async ({format}) => {
    await format(json, 'no');
});

test('formatter: json: many', async ({formatMany}) => {
    await formatMany(json, ['var', 'var']);
});

