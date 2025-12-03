import {createTest} from '@putout/test';
import * as variables from '@putout/plugin-variables';
import stream from '../lib/stream.js';

const rmUnused = variables.rules['remove-unused'];

const test = createTest(import.meta.url, {
    'remove-unused-variables': rmUnused,
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
