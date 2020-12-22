'use strict';

const {join} = require('path');
const {readFile} = require('fs').promises;

const test = require('supertape');
const mockRequire = require('mock-require');

const stub = require('@cloudcmd/stub');
const {runProcessors} = require('@putout/engine-processor');
const processFile = require('putout/lib/cli/process-file');

const {stopAll, reRequire} = mockRequire;

test('putout: processor: css', async (t) => {
    const name = 'style';
    const inputName = join(__dirname, 'fixture', `${name}.css`);
    const outputName = join(__dirname, 'fixture', `${name}-fix.css`);
    
    const rawSource = await readFile(inputName, 'utf8');
    const output = await readFile(outputName, 'utf8');
    const options = {
        processors: [
            'css',
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

test('putout: processor: css: places', async (t) => {
    const name = 'style';
    const inputName = join(__dirname, 'fixture', `${name}.css`);
    
    const rawSource = await readFile(inputName, 'utf8');
    const options = {
        processors: [
            'css',
        ],
    };
    
    const fix = false;
    const {places} = await runProcessors({
        fix,
        name: inputName,
        processFile: processFile({
            fix,
        }),
        options,
        rawSource,
    });
    
    const expected = [{
        message: 'Expected indentation of 4 spaces (indentation)',
        position: {
            column: 1,
            line: 2,
        },
        rule: 'indentation (stylelint)',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: processor: css: found config', async (t) => {
    const name = 'style';
    const inputName = join(__dirname, 'fixture', `${name}.css`);
    
    const rawSource = await readFile(inputName, 'utf8');
    const options = {
        processors: [
            'css',
        ],
    };
    
    const load = async () => {};
    const search = stub().returns({
        config: {
            rules: {
                indentation: 2,
            },
        },
    });
    
    const cosmiconfig = stub().returns({
        search,
        load,
    });
    
    mockRequire('cosmiconfig', {
        cosmiconfig,
    });
    
    reRequire('../lib/css');
    const {runProcessors} = reRequire('@putout/engine-processor');
    
    const fix = false;
    const {places} = await runProcessors({
        fix,
        name: inputName,
        processFile: processFile({
            fix,
        }),
        options,
        rawSource,
    });
    
    stopAll();
    
    const expected = [{
        message: 'Expected indentation of 2 spaces (indentation)',
        position: {
            column: 1,
            line: 2,
        },
        rule: 'indentation (stylelint)',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

