'use strict';

const {join} = require('path');
const {readFile} = require('fs').promises;

const test = require('supertape');
const {runProcessors} = require('@putout/engine-processor');
const processFile = require('putout/lib/cli/process-file');

const process = getProcess({
    extension: 'json',
    processors: [
        'json',
    ],
    plugins: [
        'eslint',
    ],
});

test('putout: processor: json', async (t) => {
    const {
        output,
        processedSource,
    } = await process('eslintrc');
    
    t.equal(processedSource, output);
    t.end();
});

function getProcess({processors, plugins, extension}) {
    return async (name) => {
        const inputName = join(__dirname, 'fixture', `${name}.${extension}`);
        const outputName = join(__dirname, 'fixture', `${name}-fix.${extension}`);
        
        const rawSource = await readFile(inputName, 'utf8');
        const output = await readFile(outputName, 'utf8');
        const options = {
            dir: __dirname,
            processors,
            plugins,
        };
        
        const {processedSource} = await runProcessors({
            name: inputName,
            processFile: processFile({fix: true}),
            options,
            rawSource,
        });
        
        return {
            processedSource,
            output,
        };
    };
}

