'use strict';

const {env} = require('node:process');
const {test, stub} = require('supertape');
const {createTest} = require('./index.js');

test('test: exported: processor: esm', async (t) => {
    const result = await import('@putout/test/processor');
    const expected = await import('./index.js');
    
    t.equal(result, expected);
    t.end();
});

test('test: exported: processor: createTest', (t) => {
    t.equal(typeof createTest(__dirname), 'function');
    t.end();
});

const typos = {
    files: '*.md',
    lint: () => ['target\n', []],
};

const testProcessor = createTest(__dirname, {
    extension: 'md',
    processorRunners: [typos],
});

testProcessor('test: processor: processorRunners', async ({noProcess}) => {
    await noProcess('typos-no-process');
});

testProcessor('test: processor: processorRunners: same input and output', async ({process, calledWith}) => {
    const {UPDATE} = env;
    delete env.UPDATE;
    const fail = stub().returns({
        is: true,
        message: 'should fail when input === output',
    });
    
    globalThis.__putout_test_fail = fail;
    
    await process('typos');
    
    if (UPDATE)
        env.UPDATE = UPDATE;
    
    const args = [`'input' === 'output', use 'noProcess()'`];
    delete globalThis.__putout_test_fail;
    
    calledWith(fail, args);
}, {
    checkAssertionsCount: false,
});
