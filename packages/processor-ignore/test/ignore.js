'use strict';

const {join} = require('path');
const {readFile} = require('fs').promises;

const test = require('supertape');
const {runProcessors} = require('@putout/engine-processor');
const processFile = require('putout/lib/cli/process-file');

const process = getProcess({
    processors: [
        'ignore',
    ],
    plugins: [
        'gitignore',
    ],
});

test('putout: processor: ignore', async (t) => {
    const {
        output,
        processedSource,
    } = await process('.gitignore');
    
    t.equal(output, processedSource);
    t.end();
});

test('putout: processor: ignore: no fix', async (t) => {
    const {
        rawSource,
        processedSource,
    } = await process('.gitignore', {fix: false});
    
    t.equal(processedSource, rawSource);
    t.end();
});

function getProcess({processors, plugins, ext = ''}) {
    return async (name, {fix = true} = {}) => {
        const inputName = join(__dirname, 'fixture', `${name}${ext}`);
        const outputName = join(__dirname, 'fixture', `${name}-fix${ext}`);
        
        const rawSource = await readFile(inputName, 'utf8');
        const output = await readFile(outputName, 'utf8');
        
        const options = {
            dir: __dirname,
            processors,
            plugins,
        };
        
        const {processedSource} = await runProcessors({
            name: inputName,
            processFile: processFile({fix}),
            options,
            rawSource,
        });
        
        return {
            rawSource,
            output,
            processedSource,
        };
    };
}

