'use strict';

const {
    readFile,
    writeFile,
} = require('fs/promises');
const {
    join,
    extname,
    basename,
} = require('path');

const test = require('supertape');
const processFile = require('putout/process-file');
const {runProcessors} = require('@putout/engine-processor');

const isStr = (a) => typeof a === 'string';
const isUpdate = () => global.process.env.UPDATE;

const buildOptions = ({options, plugins, processors}) => ({
    ...options,
    plugins: plugins || options.plugins,
    processors: processors || options.processors,
});

const addDot = (a) => a ? `.${a}` : '';
module.exports._addDot = addDot;

module.exports.createTest = (dir, options) => {
    return test.extend({
        process: createProcess(dir, options),
        noProcess: createNoProcess(dir, options),
        comparePlaces: createComparePlaces(dir, options),
    });
};

const createProcess = (dir, options) => (operator) => async (filename, plugins, processors) => {
    if (!isStr(filename))
        return operator.fail(`Expected filename to be string!`);
    
    const {
        processedSource,
        output,
    } = await process(
        filename,
        dir,
        buildOptions({
            options,
            plugins,
            processors,
        }),
    );
    
    return operator.equal(processedSource, output, 'fixtures should equal');
};

module.exports._createProcess = createProcess;

const createNoProcess = (dir, options) => (operator) => async (filename, plugins, processors) => {
    if (!isStr(filename))
        return operator.fail(`Expected filename to be string!`);
    
    const {
        processedSource,
        rawSource,
    } = await process(filename, dir, {
        noChange: true,
        ...buildOptions({
            options,
            plugins,
            processors,
        }),
    });
    
    return operator.equal(processedSource, rawSource, 'fixtures should equal');
};
module.exports._createNoProcess = createNoProcess;

const createComparePlaces = (dir, options) => (operator) => async (filename, expectedPlaces) => {
    if (!isStr(filename))
        return operator.fail(`Expected filename to be string!`);
    
    const {places} = await process(filename, dir, {
        fix: false,
        ...options,
    });
    
    return operator.deepEqual(places, expectedPlaces, 'places should equal');
};
module.exports._createComparePlaces = createComparePlaces;

async function process(filename, dir, {processors, plugins, extension, fix = true, noChange = false}) {
    extension = addDot(extname(filename).slice(1) || extension);
    filename = basename(filename, String(extension));
    
    const inputName = join(dir, 'fixture', `${filename}${extension}`);
    const outputName = join(dir, 'fixture', `${filename}-fix${extension}`);
    
    const rawSource = await readFile(inputName, 'utf8');
    const output = !fix || noChange ? '' : await readFile(outputName, 'utf8');
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
    
    if (isUpdate() && !noChange)
        await writeFile(outputName, processedSource);
    
    return {
        processedSource,
        output,
        places,
        rawSource,
    };
}

