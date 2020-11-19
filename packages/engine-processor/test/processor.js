'use strict';

const {readFile} = require('fs').promises;
const {join} = require('path');

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const {runProcessors, getExtensions} = require('..');

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

test('putout: engine-processor: markdown: javascript', async (t) => {
    const name = join(__dirname, 'fixture/js.md');
    const options = {
        processors: [
            'markdown',
        ],
    };
    const rawSource = await readFile(name, 'utf8');
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
        name: `${name}{js}`,
        options,
        rawSource,
        source: 'const a = 5;',
        startLine: 1,
    };
    
    t.ok(process.calledWith(expected), 'should not process');
    t.end();
});

test('putout: engine-processor: getExtensions', (t) => {
    const js = {
        extensions: [
            'js',
            'ts',
        ],
    };
    
    const css = {
        extensions: [
            'css',
        ],
    };
    
    const processors = [js, css];
    const result = getExtensions(processors);
    
    const expected = [
        'js',
        'ts',
        'css',
    ];
    
    t.deepEqual(expected, result, 'should equal');
    t.end();
});

