'use strict';

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const {runProcessors} = require('..');

test('putout: engine-processor: no processor', async (t) => {
    const name = 'hello.xxx';
    const process = stub();
    const options = {};
    const rawSource = '';
    const index = 0;
    const length = 1;
    
    const {isProcessed} = await runProcessors({
        name,
        process,
        options,
        rawSource,
        index,
        length,
    });
    
    t.notOk(isProcessed, 'should not process');
    t.end();
});

test('putout: engine-processor: javascript', async (t) => {
    const name = 'hello.js';
    const options = {};
    const rawSource = `const a = 'hello'`;
    const index = 0;
    const length = 1;
    const process = stub().returns({
        source: rawSource,
        places: [],
    });
    
    await runProcessors({
        name,
        process,
        options,
        rawSource,
        index,
        length,
    });
    
    const expected = {
        index,
        length,
        name,
        options,
        rawSource,
        source: rawSource,
        startLine: 0,
    };
    
    t.ok(process.calledWith(expected), 'should not process');
    t.end();
});

