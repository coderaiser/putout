import {
    readFile,
    writeFile,
    unlink,
} from 'node:fs/promises';
import {
    join,
    extname,
    basename,
} from 'node:path';
import {tryToCatch} from 'try-to-catch';
import test from 'supertape';
import {initProcessFile} from '@putout/cli-process-file';
import {runProcessors} from '@putout/engine-processor';
import {maybeDirectory} from '../maybe-directory.js';

const isStr = (a) => typeof a === 'string';
const isUpdate = () => Number(globalThis.process.env.UPDATE);

const update = async (a, b) => {
    const write = globalThis.writeFile || writeFile;
    await write(a, b);
};

const remove = async (a) => {
    const remove = globalThis.unlink || unlink;
    await tryToCatch(remove, a);
};

const read = async (a, b) => {
    const read = globalThis.readFile || readFile;
    return await read(a, b);
};

const buildOptions = ({options, plugins, processors}) => ({
    ...options,
    plugins: plugins || options.plugins,
    processors: processors || options.processors,
});

const addDot = (a) => a ? `.${a}` : '';

const fail = (t, message) => {
    const {
        __putout_test_fail = t.fail,
    } = globalThis;
    
    return __putout_test_fail(message);
};

export const _addDot = addDot;

export const createTest = (url, options) => {
    const dir = maybeDirectory(url);
    
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

export const _createProcess = createProcess;

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

export const _createNoProcess = createNoProcess;

const createComparePlaces = (dir, options) => (operator) => async (filename, expectedPlaces) => {
    if (!isStr(filename))
        return operator.fail(`Expected filename to be string!`);
    
    const {places} = await process(filename, dir, {
        fix: false,
        ...options,
    });
    
    return operator.deepEqual(places, expectedPlaces, 'places should equal');
};

export const _createComparePlaces = createComparePlaces;

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
        processFile: initProcessFile({
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
