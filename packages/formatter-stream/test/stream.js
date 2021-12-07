import {createCommons} from 'simport';

import createTest from '@putout/test';
import rmVars from '@putout/plugin-remove-unused-variables';

import stream from '../lib/stream.js';

const {__dirname} = createCommons(import.meta.url);

const test = createTest(__dirname, {
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

