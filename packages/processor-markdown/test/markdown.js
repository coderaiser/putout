'use strict';

const {join} = require('path');
const {readFile} = require('fs').promises;

const test = require('supertape');
const {runProcessors} = require('@putout/engine-processor');
const processFile = require('putout/lib/cli/process-file');

test('putout: processor: markdown', async (t) => {
    const {
        output,
        processedSource,
    } = await doTheThing('js');
    
    t.equal(processedSource, output);
    t.end();
});

test('putout: processor: markdown: ts', async (t) => {
    const {
        output,
        processedSource,
    } = await doTheThing('ts');
    
    t.equal(processedSource, output);
    t.end();
});

test('putout: processor: markdown: json', async (t) => {
    const {
        output,
        processedSource,
    } = await doTheThing('json');
    
    t.equal(processedSource, output);
    t.end();
});

test('putout: processor: markdown: no js', async (t) => {
    const {
        output,
        processedSource,
    } = await doTheThing('no-js');
    
    t.equal(processedSource, output);
    t.end();
});

test('putout: processor: markdown: bracket: no "\\["', async (t) => {
    const {
        output,
        processedSource,
    } = await doTheThing('bracket');
    
    t.equal(processedSource, output);
    t.end();
});

test('putout: processor: links: no new lines', async (t) => {
    const {
        output,
        processedSource,
    } = await doTheThing('links');
    
    t.equal(processedSource, output);
    t.end();
});

test('putout: processor: markdown: places', async (t) => {
    const {places} = await doTheThing('place', {
        fix: false,
    });
    
    const expected = [{
        message: 'Code blocks should be indented',
        position: {
            column: 1,
            line: 3,
        },
        rule: 'code-block-style (remark-lint)',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

async function doTheThing(name, {fix} = {}) {
    const inputName = join(__dirname, 'fixture', `${name}.md`);
    const outputName = join(__dirname, 'fixture', `${name}-fix.md`);
    
    const rawSource = await readFile(inputName, 'utf8');
    const output = await readFile(outputName, 'utf8');
    const options = {
        dir: __dirname,
        processors: [
            'markdown',
            'json',
        ],
        plugins: [
            'remove-unused-variables',
            'eslint',
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
