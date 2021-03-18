'use strict';

const {join} = require('path');
const {readFile} = require('fs/promises');

const test = require('supertape');
const {runProcessors} = require('@putout/engine-processor');
const processFile = require('putout/process-file');

const process = getProcess({
    extension: 'ts',
    processors: [
        'typescript',
    ],
});

test('putout: processor: typescript', async (t) => {
    const {places} = await process('typescript');
    const expected = [{
        message: 'Type \'0\' is not assignable to type \'null\'.',
        position: {
            column: 1,
            line: 1,
        },
        rule: 'type-check (typescript)',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

function getProcess({processors, plugins, extension}) {
    return async (name) => {
        const inputName = join(__dirname, 'fixture', `${name}.${extension}`);
        const rawSource = await readFile(inputName, 'utf8');
        
        const options = {
            dir: __dirname,
            processors,
            plugins,
        };
        
        const fix = false;
        const {
            processedSource,
            places,
        } = await runProcessors({
            fix,
            name: inputName,
            processFile: processFile({fix}),
            options,
            rawSource,
        });
        
        return {
            processedSource,
            places,
        };
    };
}

