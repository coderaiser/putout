import {createTest} from '@putout/test';
import rmVars from '@putout/plugin-remove-unused-variables';

import progress from '../lib/progress-bar.js';

const createFreshImport = (count = 0) => (name) => import(`${name}?count=${++count}`);
const freshImport = createFreshImport();

const test = createTest(import.meta.url, {
    'remove-unused-variables': rmVars,
});

const freshImportDefault = async (name) => (await freshImport(name)).default;

test('formatter: progress bar', async ({format}) => {
    await format(progress, 'var');
});

test('formatter: progress bar: no', async ({format}) => {
    await format(progress, 'no');
});

test('formatter: progress bar: many', async ({formatMany}) => {
    await formatMany(progress, ['var', 'var']);
});

test('formatter: progress bar: minCount', async ({format}) => {
    await format(progress, 'min-count', {
        minCount: 10,
    });
});

test('formatter: progress bar: color', async ({format}) => {
    const progress = await freshImportDefault('../lib/progress-bar.js');
    await format(progress, 'color', {
        color: 'red',
    });
});

test('formatter: progress bar: get stream: disable progress bar', async ({notEqual}) => {
    const {PUTOUT_PROGRESS_BAR} = process.env;
    
    process.env.PUTOUT_PROGRESS_BAR = '0';
    const {_getStream} = await freshImport('../lib/progress-bar.js');
    const stream = _getStream();
    const {stderr} = process;
    
    process.env.PUTOUT_PROGRESS_BAR = PUTOUT_PROGRESS_BAR;
    
    notEqual(stream, stderr, 'should equal to stderr');
});

test('formatter: progress bar: get stream', async ({ok}) => {
    const {PUTOUT_PROGRESS_BAR} = process.env;
    delete process.env.PUTOUT_PROGRESS_BAR;
    
    const {_getStream} = await freshImport('../lib/progress-bar.js');
    const stream = _getStream();
    
    const {stderr} = process;
    process.env.PUTOUT_PROGRESS_BAR = PUTOUT_PROGRESS_BAR;
    
    ok(stream === stderr, 'should equal to stderr');
});

