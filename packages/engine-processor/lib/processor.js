'use strict';

const {loadProcessors} = require('@putout/engine-loader');
const picomatch = require('picomatch');

const defaultProcessors = [
    'javascript',
];

const addExtension = (name, ext) => !ext ? name : `${name}{${ext}}`;
const stubFind = () => [];
const stubFix = (a) => a;
const stubSplit = () => [];

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
    const branchedList = [];
    
    for (const {source, startLine = 0, extension, merge} of fileList) {
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
            processedSource = await merge(processedSource, branchedList);
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
            merge,
            branch = stubSplit,
            find = stubFind,
            fix: fixFind = stubFix,
        } = currentRunner;
        
        if (!isMatch(name))
            continue;
        
        isProcessed = true;
        
        if (fix)
            processedSource = await fixFind(rawSource);
        else
            processedPlaces = await find(rawSource);
        
        if (!processedSource)
            processedSource = rawSource;
        
        const info = await branch(processedSource);
        const files = info.map(addMerge(merge));
        
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

const addMerge = (merge) => (el) => ({
    ...el,
    merge,
});

