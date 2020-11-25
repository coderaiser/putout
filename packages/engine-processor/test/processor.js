'use strict';

const {readFile} = require('fs').promises;
const {join} = require('path');

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const processFile = require('putout/lib/cli/process-file');

const {
    runProcessors,
    getFilePatterns,
} = require('..');

test('putout: engine-processor: no processor', async (t) => {
    const name = 'hello.xxx';
    const processFile = stub();
    const options = {};
    const rawSource = '';
    const index = 0;
    const length = 1;
    
    const {isProcessed} = await runProcessors({
        name,
        processFile,
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
    const processFile = stub().returns({
        source: rawSource,
        places: [],
    });
    
    await runProcessors({
        name,
        processFile,
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
    
    t.ok(processFile.calledWith(expected), 'should not process');
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
    const processFile = stub().returns({
        source: rawSource,
        places: [],
    });
    
    await runProcessors({
        name,
        processFile,
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
    
    t.ok(processFile.calledWith(expected), 'should not process');
    t.end();
});

test('putout: engine-processor: markdown: fix', async (t) => {
    const name = join(__dirname, 'fixture', 'fix.md');
    const outputName = join(__dirname, 'fixture', 'fix-fix.md');
    const options = {
        dir: __dirname,
        processors: [
            'markdown',
        ],
    };
    const rawSource = await readFile(name, 'utf8');
    const output = await readFile(outputName, 'utf8');
    const index = 0;
    const length = 1;
    
    const {processedSource} = await runProcessors({
        name,
        fix: true,
        processFile: processFile({
            name: `${name}{js}`,
            fix: true,
        }),
        options,
        rawSource,
        index,
        length,
    });
    
    t.equal(processedSource, output);
    t.end();
});

test('putout: engine-processor: markdown: no fix', async (t) => {
    const name = join(__dirname, 'fixture/no-fix.md');
    const options = {
        processors: [
            'markdown',
        ],
    };
    const rawSource = await readFile(name, 'utf8');
    const index = 0;
    const length = 1;
    
    const {processedSource} = await runProcessors({
        name,
        processFile: processFile({
            name: `${name}{js}`,
            fix: true,
        }),
        options,
        rawSource,
        index,
        length,
    });
    
    t.equal(processedSource, rawSource, 'should equal');
    t.end();
});

test('putout: engine-processor: markdown: fix: processed places', async (t) => {
    const name = join(__dirname, 'fixture/places.md');
    const options = {
        processors: [
            'markdown',
        ],
    };
    const rawSource = await readFile(name, 'utf8');
    const index = 0;
    const length = 1;
    const fix = true;
    
    const {places} = await runProcessors({
        name,
        fix,
        processFile: processFile({
            name: `${name}{js}`,
            fix,
        }),
        options,
        rawSource,
        index,
        length,
    });
    
    t.deepEqual(places, [], 'should equal');
    t.end();
});

test('putout: engine-processor: markdown: no fix: processed places', async (t) => {
    const name = join(__dirname, 'fixture/places.md');
    const options = {
        processors: [
            'markdown',
        ],
    };
    const rawSource = await readFile(name, 'utf8');
    const index = 0;
    const length = 1;
    
    const fix = false;
    const {places} = await runProcessors({
        name,
        processFile: processFile({
            name: `${name}{js}`,
            fix,
        }),
        options,
        rawSource,
        index,
        length,
    });
    
    const expected = [{
        message: 'Code blocks should be fenced',
        rule: 'code-block-style (remark-lint)',
        position: {line: 11, column: 1},
    }];
    
    t.deepEqual(expected, places, 'should equal');
    t.end();
});

test('putout: engine-processor: markdown: no fix: places', async (t) => {
    const name = join(__dirname, 'fixture/places.md');
    const options = {
        processors: [
            'markdown',
        ],
    };
    const rawSource = await readFile(name, 'utf8');
    const index = 0;
    const length = 1;
    
    const {processedSource} = await runProcessors({
        name,
        processFile: processFile({
            name: `${name}{js}`,
            fix: false,
        }),
        options,
        rawSource,
        index,
        length,
    });
    
    t.equal(processedSource, rawSource, 'should equal');
    t.end();
});

test('putout: engine-processor: markdown: js changed', async (t) => {
    const name = join(__dirname, 'fixture/js-changed.md');
    const fixedName = join(__dirname, 'fixture/js-changed-fix.md');
    const options = {
        processors: [
            'markdown',
        ],
    };
    const rawSource = await readFile(name, 'utf8');
    const expectedSource = await readFile(fixedName, 'utf8');
    const index = 0;
    const length = 1;
    
    const {processedSource} = await runProcessors({
        name,
        processFile: processFile({
            name: `${name}{js}`,
            fix: true,
        }),
        options,
        rawSource,
        index,
        length,
    });
    
    t.equal(processedSource, expectedSource, 'should equal');
    t.end();
});

test('putout: engine-processor: yaml: no startLine', async (t) => {
    const name = join(__dirname, 'fixture/travis.yml');
    const options = {
        plugins: [
            'travis',
        ],
        processors: [
            'yaml',
        ],
    };
    const rawSource = await readFile(name, 'utf8');
    const index = 0;
    const length = 1;
    
    const {places} = await runProcessors({
        name,
        processFile: processFile({
            name: `${name}{json}`,
            fix: false,
        }),
        options,
        rawSource,
        index,
        length,
    });
    
    const expected = [{
        message: '"cache" field should exist in travis',
        position: {
            column: 0,
            line: 1,
        },
        rule: 'travis/disable-cache',
    
    }];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: engine-processor: getFilePatterns', (t) => {
    const js = {
        files: [
            '*.js',
            '*.ts',
        ],
    };
    
    const css = {
        files: [
            '*.css',
        ],
    };
    
    const processors = [js, css];
    const result = getFilePatterns(processors);
    
    const expected = [
        '*.js',
        '*.ts',
        '*.css',
    ];
    
    t.deepEqual(expected, result, 'should equal');
    t.end();
});

