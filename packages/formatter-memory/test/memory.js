import {createCommons} from 'simport';
import createTest from '@putout/test';

const {
    __dirname,
    require,
} = createCommons(import.meta.url);

import progress from '../lib/memory.js';

const test = createTest(__dirname, {
    'remove-unused-variables': require('@putout/plugin-remove-unused-variables'),
});

const freshImport = ((count) => (name) => import(`${name}?count=${++count}`))(0);

const freshImportDefault = ((count) => async (name) => (await import(`${name}?count=${++count}`)).default)(0);

test('formatter: memory', async ({format}) => {
    await format(progress, 'var');
});

test('formatter: memory: no', async ({format}) => {
    await format(progress, 'no');
});

test('formatter: memory: many', async ({formatMany}) => {
    await formatMany(progress, ['var', 'var']);
});

test('formatter: memory: minCount', async ({format}) => {
    await format(progress, 'min-count', {
        minCount: 10,
    });
});

test('formatter: memory: color', async ({format}) => {
    const progress = await freshImportDefault('../lib/memory.js');
    await format(progress, 'color', {
        color: 'red',
    });
});

test('formatter: memory: get stream: no progress bar', async (t) => {
    const {PUTOUT_PROGRESS_BAR} = process.env;
    
    process.env.PUTOUT_PROGRESS_BAR = 0;
    
    const {_getStream} = await freshImport('../lib/memory.js');
    const stream = _getStream();
    const {stderr} = process;
    
    process.env.PUTOUT_PROGRESS_BAR = PUTOUT_PROGRESS_BAR;
    
    t.notEqual(stream, stderr, 'should equal to stderr');
    t.end();
});

test('formatter: memory: get stream', async (t) => {
    const {PUTOUT_PROGRESS_BAR} = process.env;
    delete process.env.PUTOUT_PROGRESS_BAR;
    
    const {_getStream} = await freshImport('../lib/memory.js');
    const stream = _getStream();
    
    const {stderr} = process;
    process.env.PUTOUT_PROGRESS_BAR = PUTOUT_PROGRESS_BAR;
    
    t.equal(stream, stderr, 'should equal to stderr');
    t.end();
});

test('formatter: memory: parse memory: no CI', async (t) => {
    const {TEST} = process.env;
    delete process.env.TEST;
    
    const memory = {
        rss: 0,
        heapUsed: 0,
        totalHeap: 0,
    };
    
    const {_parseMemory} = await freshImport('../lib/memory.js');
    const result = _parseMemory(memory);
    
    process.env.TEST = TEST;
    
    t.equal(result, memory);
    t.end();
});

