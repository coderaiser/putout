'use strict';

const {join} = require('path');
const {readFile} = require('fs/promises');

const test = require('supertape');
const {runProcessors} = require('@putout/engine-processor');
const processFile = require('putout/process-file');

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

test('putout: processor: markdown: fix: should return no places', async (t) => {
    const {places} = await doTheThing('place', {
        fix: true,
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: processor: markdown: no fix: should not change source', async (t) => {
    const {
        processedSource,
        rawSource,
    } = await doTheThing('no-places-no-change', {
        fix: false,
    });
    
    t.equal(processedSource, rawSource);
    t.end();
});

async function doTheThing(name, {fix = true} = {}) {
    const inputName = join(__dirname, 'fixture', `${name}.md`);
    const outputName = join(__dirname, 'fixture', `${name}-fix.md`);
    
    const rawSource = await readFile(inputName, 'utf8');
    const output = !fix ? '' : await readFile(outputName, 'utf8');
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
    
    const {
        processedSource,
        places,
    } = await runProcessors({
        fix,
        name: inputName,
        processFile: processFile({
            fix,
        }),
        options,
        rawSource,
    });
    
    return {
        processedSource,
        rawSource,
        output,
        places,
    };
}
