import {createTest} from '@putout/test';
import rmVars from '@putout/plugin-remove-unused-variables';

import stream from '../lib/stream.js';

const test = createTest(import.meta.url, {
    'remove-unused-variables': rmVars,
});

test('formatter: stream', async ({format}) => {
    await format(stream, 'var');
});

test('formatter: stream: no', async ({noFormat}) => {
    await noFormat(stream, 'no');
});

test('formatter: stream: many', async ({formatMany}) => {
    await formatMany(stream, ['var', 'var']);
});

