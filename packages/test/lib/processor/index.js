'use strict';

const {readFile} = require('fs/promises');
const {
    join,
    extname,
    basename,
} = require('path');

const test = require('supertape');
const processFile = require('putout/process-file');
const {runProcessors} = require('@putout/engine-processor');

const isStr = (a) => typeof a === 'string';

module.exports.createTest = (dir, options) => {
    return test.extend({
        process: createProcess(dir, options),
        comparePlaces: createComparePlaces(dir, options),
    });
};

const createProcess = (dir, options) => (operator) => async (filename, plugins) => {
    if (!isStr(filename))
        return operator.fail(`Expected filename to be string!`);
    
    const {
        processedSource,
        output,
    } = await process(filename, dir, {
        ...options,
        plugins: plugins || options.plugins,
    });
    
    return operator.equal(processedSource, output, 'fixtures should equal');
};
module.exports._createProcess = createProcess;

const createComparePlaces = (dir, options) => (operator) => async (filename, expectedPlaces) => {
    if (!isStr(filename))
        return operator.fail(`Expected filename to be string!`);
    
    const {places} = await process(filename, dir, {
        ...options,
        fix: false,
    });
    
    return operator.deepEqual(places, expectedPlaces, 'places should equal');
};
module.exports._createComparePlaces = createComparePlaces;

async function process(filename, dir, {processors, plugins, extension, fix = true}) {
    extension = extname(filename).slice(1) || extension;
    filename = basename(filename, `.${extension}`);
    
    const inputName = join(dir, 'fixture', `${filename}.${extension}`);
    const outputName = join(dir, 'fixture', `${filename}-fix.${extension}`);
    
    const rawSource = await readFile(inputName, 'utf8');
    const output = !fix ? '' : await readFile(outputName, 'utf8');
    const options = {
        dir,
        processors,
        plugins,
    };
    
    const {
        places,
        processedSource,
    } = await runProcessors({
        fix,
        name: inputName,
        processFile: processFile({fix}),
        options,
        rawSource,
    });
    
    return {
        processedSource,
        output,
        places,
    };
}

