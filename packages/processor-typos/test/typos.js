'use strict';

const {join} = require('path');
const {readFile} = require('fs/promises');

const test = require('supertape');
const {runProcessors} = require('@putout/engine-processor');
const processFile = require('putout/process-file');

const process = getProcess({
    ext: '.js',
    processors: [
        'typos',
    ],
});

test.only('putout: processor: typos', async (t) => {
    const {
        output,
        processedSource,
    } = await process('arrow');
    
    t.equal(processedSource, output);
    t.end();
});

test.only('putout: processor: typos: places', async (t) => {
    const {
        output,
        places,
    } = await process('arrow', {
        fix: false,
    });
    
      const expected = [
        {
            "message": "\"function() => {\" should be changed to \"function() {\"",
            "position": {
              "column": 1,
              "line": 3,
            },
            "rule": "arrow-declaration (typos)",
          },
      ]
    
    t.deepEqual(places, expected);
    t.end();
});

test.only('putout: processor: typos: import', async (t) => {
    const {
        output,
        processedSource,
    } = await process('import');
    
    t.equal(processedSource, output);
    t.end();
});

function getProcess({processors, plugins, rules, ext = ''}) {
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
            rules,
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

