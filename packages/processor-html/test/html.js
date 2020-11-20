'use strict';

const {join} = require('path');
const {readFile} = require('fs/promises');

const test = require('supertape');
const {runProcessors} = require('@putout/engine-processor');
const processFile = require('putout/process-file');

const processors = [
    'html',
];

test('putout: processor: html', async (t) => {
    const {
        output,
        processedSource,
    } = await process('html', {
        ext: 'html',
        processors,
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    t.equal(processedSource, output);
    t.end();
});

test('putout: processor: html: css: no fix', async (t) => {
    const {places} = await process('style', {
        ext: 'html',
        processors,
        fix: false,
    });
    
    const expected = [{
        message: '\'log\' is not defined.',
        position: {
            column: 1,
            line: 13,
        },
        rule: 'no-undef (eslint)',
    }, {
        message: 'Expected a trailing semicolon (declaration-block-trailing-semicolon)',
        position: {
            column: 26,
            line: 5,
        },
        rule: 'declaration-block-trailing-semicolon (stylelint)',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: processor: html: css: fix', async (t) => {
    const {
        output,
        processedSource,
    } = await process('style', {
        ext: 'html',
        processors,
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    t.deepEqual(processedSource, output);
    t.end();
});

async function process(name, {ext, processors, plugins, fix = true} = {}) {
    const inputName = join(__dirname, 'fixture', `${name}.${ext}`);
    const outputName = join(__dirname, 'fixture', `${name}-fix.${ext}`);
    
    const rawSource = await readFile(inputName, 'utf8');
    
    let output = '';
    
    if (fix)
        output = await readFile(outputName, 'utf8');
    
    const options = {
        dir: __dirname,
        processors,
        plugins,
    };
    
    const index = 0;
    const length = 1;
    
    const {
        processedSource,
        places,
    } = await runProcessors({
        fix,
        name: inputName,
        process,
        options,
        rawSource,
        index,
        length,
        processFile: processFile({
            fix,
        }),
    });
    
    return {
        processedSource,
        output,
        places,
    };
}

