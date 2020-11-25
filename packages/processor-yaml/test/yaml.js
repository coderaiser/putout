'use strict';

const {join} = require('path');
const {readFile} = require('fs').promises;

const test = require('supertape');
const {runProcessors} = require('@putout/engine-processor');
const processFile = require('putout/lib/cli/process-file');

test('putout: processor: yaml', async (t) => {
    const {
        output,
        processedSource,
    } = await doTheThing('travis', {
        fix: true,
        ext: '.yml',
    });
    
    t.equal(processedSource, output);
    t.end();
});

async function doTheThing(name, {fix, ext = ''} = {}) {
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
    const index = 0;
    const length = 1;
    
    const {
        processedSource,
        places,
    } = await runProcessors({
        name: inputName,
        processFile: processFile({
            fix,
        }),
        options,
        rawSource,
        index,
        length,
    });
    
    return {
        processedSource,
        output,
        places,
    };
}
