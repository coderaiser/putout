'use strict';

const {loadProcessors} = require('@putout/engine-loader');
const picomatch = require('picomatch');

const defaultProcessors = [
    'javascript',
];

const addExtension = (name, ext) => !ext ? name : `${name}{${ext}}`;
const stubFind = () => [];
const stubSplit = () => [];
const id = (a) => a;

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
    let merge = null;
    
    ({fileList, merge, isProcessed, processedSource, processedPlaces} = await getFiles({
        name,
        fix,
        rawSource,
        processorRunners,
    }));
    
    ({processedSource, allPlaces} = await iterate({
        name,
        merge,
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

async function iterate({name, rawSource, fileList, merge, processFile, processedSource, options}) {
    let codeChanged = false;
    
    const allPlaces = [];
    const branchedList = [];
    
    for (const {source, startLine = 0, extension} of fileList) {
        const processedName = addExtension(name, extension);
        const {code, places} = await processFile({
            name: processedName,
            source,
            rawSource,
            options,
            startLine,
        });
        
        branchedList.push(code);
        allPlaces.push(...places);
        
        if (places.length || code !== source)
            codeChanged = true;
    }
    
    if (codeChanged && branchedList.length)
        processedSource = await merge(processedSource, branchedList);
    
    return {
        processedSource,
        allPlaces,
    };
}

async function getFiles({name, fix, rawSource, processorRunners}) {
    const fileList = [];
    
    let isProcessed = false;
    let processedSource = '';
    let processedPlaces = [];
    let merge = null;
    
    for (const currentRunner of processorRunners) {
        const {
            isMatch,
            branch = stubSplit,
            find = stubFind,
            fix: fixFind = id,
            merge: runnersMerge = id,
        } = currentRunner;
        
        if (!isMatch(name))
            continue;
        
        merge = runnersMerge;
        
        isProcessed = true;
        
        if (fix)
            processedSource = await fixFind(rawSource);
        else
            processedPlaces = await find(rawSource);
        
        if (!processedSource)
            processedSource = rawSource;
        
        const files = await branch(processedSource);
        
        fileList.push(...files);
    }
    
    return {
        merge,
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

