'use strict';

const {join} = require('path');
const {readFile} = require('fs').promises;

const test = require('supertape');
const {runProcessors} = require('@putout/engine-processor');
const processFile = require('putout/lib/cli/process-file');

test('putout: processor: javascript', async (t) => {
    const inputName = join(__dirname, 'fixture', 'simple.js');
    const outputName = join(__dirname, 'fixture', 'simple-fix.js');
    const rawSource = await readFile(inputName, 'utf8');
    const output = await readFile(outputName, 'utf8');
    const options = {
        dir: __dirname,
        processors: [
            'javascript',
        ],
        plugins: [
            'remove-unused-variables',
        ],
    };
    
    const fix = true;
    const {processedSource} = await runProcessors({
        fix,
        name: inputName,
        processFile: processFile({fix}),
        options,
        rawSource,
    });
    
    t.equal(processedSource, output);
    t.end();
});

