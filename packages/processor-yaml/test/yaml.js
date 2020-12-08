'use strict';

const {join} = require('path');
const {readFile} = require('fs').promises;

const test = require('supertape');
const {runProcessors} = require('@putout/engine-processor');
const processFile = require('putout/lib/cli/process-file');

test('putout: processor: yaml', async (t) => {
    const ext = '.yml';
    const name = 'travis';
    const inputName = join(__dirname, 'fixture', `${name}${ext}`);
    const outputName = join(__dirname, 'fixture', `${name}-fix${ext}`);
    
    const rawSource = await readFile(inputName, 'utf8');
    const output = await readFile(outputName, 'utf8');
    
    const options = {
        dir: __dirname,
        processors: [
            'yaml',
        ],
        plugins: [
            'travis/disable-cache',
        ],
    };
    
    const fix = true;
    const {processedSource} = await runProcessors({
        fix,
        name: inputName,
        processFile: processFile({
            fix,
        }),
        options,
        rawSource,
    });
    
    t.equal(processedSource, output);
    t.end();
});

test('putout: processor: yaml: duplicate', async (t) => {
    const ext = '.yml';
    const name = 'duplicate';
    const inputName = join(__dirname, 'fixture', `${name}${ext}`);
    
    const rawSource = await readFile(inputName, 'utf8');
    
    const options = {
        dir: __dirname,
        processors: [
            'yaml',
        ],
    };
    
    const {places} = await runProcessors({
        name: inputName,
        processFile: processFile({
            fix: false,
        }),
        options,
        rawSource,
    });
    
    const expected = [{
        position: {
            column: 1,
            line: 4,
        },
        message: 'Duplicated mapping key only',
        rule: 'duplicated-mapping-key (yaml)',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

