'use strict';

const {loadProcessors} = require('@putout/engine-loader');
const picomatch = require('picomatch');

const defaultProcessors = [
    'javascript',
];

const addExtension = (name, ext) => !ext ? name : `${name}{${ext}}`;
const stubProcess = (a) => [a, []];
const stubPreProcess = () => [];

module.exports.defaultProcessors = defaultProcessors;

module.exports.getFilePatterns = (processors) => {
    const result = [];
    
    for (const {files} of processors) {
        result.push(...files);
    }
    
    return result;
};

module.exports.runProcessors = async ({name, fix, processFile, options, rawSource, processorRunners}) => {
    const {
        processors = defaultProcessors,
    } = options;
    
    processorRunners = processorRunners || getProcessorRunners(processors);
    
    let processedSource = '';
    let processedPlaces = [];
    let isProcessed = false;
    let fileList = [];
    let allPlaces = [];
    
    ({fileList, isProcessed, processedSource, processedPlaces} = await getFiles({
        name,
        fix,
        rawSource,
        processorRunners,
    }));
    
    ({processedSource, allPlaces} = await iterate({
        name,
        fileList,
        options,
        rawSource,
        processFile,
        processedSource,
    }));
    
    allPlaces.push(...processedPlaces);
    
    if (!fix)
        processedSource = rawSource;
    
    return {
        places: allPlaces,
        processedSource,
        isProcessed,
    };
};

async function iterate({name, rawSource, fileList, processFile, processedSource, options}) {
    const allPlaces = [];
    const preProcessedList = [];
    
    for (const {source, startLine = 0, extension, postProcess} of fileList) {
        const processedName = addExtension(name, extension);
        const {code, places} = await processFile({
            name: processedName,
            source,
            rawSource,
            options,
            startLine,
        });
        
        preProcessedList.push(code);
        allPlaces.push(...places);
        
        if (places.length || code !== source)
            processedSource = await postProcess(processedSource, preProcessedList);
    }
    
    return {
        processedSource,
        allPlaces,
    };
}

async function getFiles({name, fix, rawSource, processorRunners}) {
    let isProcessed = false;
    let processedSource = '';
    let processedPlaces = [];
    const fileList = [];
    
    for (const currentRunner of processorRunners) {
        const {
            isMatch,
            postProcess,
            preProcess = stubPreProcess,
            process = stubProcess,
        } = currentRunner;
        
        if (!isMatch(name))
            continue;
        
        isProcessed = true;
        [processedSource, processedPlaces] = await process(rawSource, {
            fix,
        });
        
        if (!processedSource)
            processedSource = rawSource;
        
        const info = await preProcess(processedSource);
        const files = info.map(addPostProcess(createPostProcess({
            postProcess,
        })));
        
        fileList.push(...files);
    }
    
    return {
        isProcessed,
        processedSource,
        processedPlaces,
        fileList,
    };
}

module.exports.getProcessorRunners = getProcessorRunners;
function getProcessorRunners(processors) {
    return loadProcessors({
        processors,
    }).map(addGlobs);
}

function addGlobs(processor) {
    const {files} = processor;
    
    return {
        ...processor,
        isMatch: picomatch(files, {
            dot: true,
            matchBase: true,
        }),
    };
}

const addPostProcess = (postProcess) => (el) => ({
    ...el,
    postProcess,
});

function createPostProcess({postProcess}) {
    let i = 0;
    
    return async (processedSource, preProcessedList) => {
        if (++i === preProcessedList.length)
            return await postProcess(processedSource, preProcessedList);
        
        return processedSource;
    };
}

