import {test, stub} from 'supertape';
import {createTest} from './index.mjs';

test('test: exported: processor: esm', async (t) => {
    const result = await import('@putout/test/processor');
    const expected = await import('./index.mjs');
    
    t.equal(result, expected);
    t.end();
});

test('test: exported: processor: createTest', (t) => {
    t.equal(typeof createTest(import.meta.url), 'function');
    t.end();
});

const typos = {
    files: '*.md',
    lint: () => ['target\n', []],
};

const testProcessor = createTest(import.meta.url, {
    extension: 'md',
    processorRunners: [typos],
});

testProcessor('test: processor: processorRunners', async ({noProcess}) => {
    await noProcess('typos');
});

testProcessor('test: processor: processorRunners: same input and output', async ({process, calledWith}) => {
    const fail = stub().returns({
        is: true,
        message: 'should fail when input === output',
    });
    
    global.__putout_test_fail = fail;
    
    await process('typos');
    
    const args = [`'input' === 'output', use 'noProcess()'`];
    delete global.__putout_test_fail;
    calledWith(fail, args);
}, {
    checkAssertionsCount: false,
});
