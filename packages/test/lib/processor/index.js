'use strict';

const tryToCatch = require('try-to-catch');
const {
    readFile,
    writeFile,
    unlink,
} = require('node:fs/promises');

const {
    join,
    extname,
    basename,
} = require('node:path');

const test = require('supertape');
const processFile = require('putout/process-file');
const {runProcessors} = require('@putout/engine-processor');

const isStr = (a) => typeof a === 'string';
const isUpdate = () => Number(global.process.env.UPDATE);

const update = async (a, b) => {
    const write = global.writeFile || writeFile;
    await write(a, b);
};

const remove = async (a) => {
    const remove = global.unlink || unlink;
    await tryToCatch(remove, a);
};

const read = async (a, b) => {
    const read = global.readFile || readFile;
    return await read(a, b);
};

const buildOptions = ({options, plugins, processors}) => ({
    ...options,
    plugins: plugins || options.plugins,
    processors: processors || options.processors,
});

const addDot = (a) => a ? `.${a}` : '';

const fail = (t, message) => {
    const {__putout_test_fail = t.fail} = global;
    return __putout_test_fail(message);
};

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
        return fail(operator, `Expected filename to be string!`);
    
    const {
        processedSource,
        rawSource,
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
    
    if (isUpdate())
        return operator.pass('fixtures updated');
    
    if (rawSource === processedSource)
        return fail(operator, `'input' === 'output', use 'noProcess()'`);
    
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

async function process(filename, dir, config) {
    let {extension} = config;
    const {
        printer,
        processors,
        plugins,
        fix = true,
        noChange = false,
        processorRunners,
    } = config;
    
    extension = addDot(extname(filename).slice(1) || extension);
    filename = basename(filename, String(extension));
    
    const inputName = join(dir, 'fixture', `${filename}${extension}`);
    const outputName = join(dir, 'fixture', `${filename}-fix${extension}`);
    
    const rawSource = await read(inputName, 'utf8');
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
        processFile: processFile({
            printer,
            fix,
        }),
        options,
        rawSource,
        processorRunners,
    });
    
    if (isUpdate())
        if (!noChange && fix)
            await update(outputName, processedSource);
        else if (noChange)
            await remove(outputName);
    
    const output = !fix || noChange ? '' : await read(outputName, 'utf8');
    
    return {
        processedSource,
        output,
        places,
        rawSource,
    };
}
