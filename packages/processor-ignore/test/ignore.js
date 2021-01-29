'use strict';

const {join} = require('path');
const {readFile} = require('fs/promises');

const test = require('supertape');
const {runProcessors} = require('@putout/engine-processor');
const processFile = require('putout/process-file');

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

test('putout: processor: ignore: windows', async (t) => {
    const {
        output,
        processedSource,
    } = await process('windows-gitignore');
    
    t.equal(processedSource, output);
    t.end();
});

test('putout: processor: ignore: rc', async (t) => {
    const process = getProcess({
        processors: [
            'ignore',
        ],
        plugins: [
            'browserlist',
        ],
    });
    
    const {
        output,
        processedSource,
    } = await process('browserlistrc');
    
    t.equal(output, processedSource);
    t.end();
});

test('putout: processor: ignore: rc: eslintrc: no crash', async (t) => {
    const process = getProcess({
        processors: [
            'ignore',
        ],
        plugins: [
            'browserlist',
        ],
    });
    
    const {places} = await process('eslintrc', {
        noTransform: true,
    });
    
    t.notOk(places.length);
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

test('putout: processor: ignore: no new line', async (t) => {
    const {
        output,
        processedSource,
    } = await process('no-new-line-ignore', {fix: true});
    
    t.equal(processedSource, output);
    t.end();
});

function getProcess({processors, plugins, ext = ''}) {
    return async (name, {fix = true, noTransform = false} = {}) => {
        const inputName = join(__dirname, 'fixture', `${name}${ext}`);
        
        let outputName;
        let output;
        
        if (!noTransform) {
            outputName = join(__dirname, 'fixture', `${name}-fix${ext}`);
            output = await readFile(outputName, 'utf8');
        }
        
        const rawSource = await readFile(inputName, 'utf8');
        
        const options = {
            dir: __dirname,
            processors,
            plugins,
        };
        
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
            rawSource,
            output,
            processedSource,
            places,
        };
    };
}

