'use strict';

const {loadProcessorsAsync} = require('@putout/engine-loader');
const picomatch = require('picomatch');
const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];
const id = (a) => a;
const returns = (a) => () => a;

const defaultProcessors = ['javascript'];
const addExtension = (name, ext) => !ext ? name : `${name}{${ext}}`;

module.exports.defaultProcessors = defaultProcessors;

module.exports.getFilePatterns = (processors) => {
    const result = [];
    
    for (const {files} of processors) {
        result.push(...files);
    }
    
    return result;
};

module.exports.runProcessors = async ({name, fix, processFile, options, rawSource, processorRunners, load}) => {
    const {
        processors = defaultProcessors,
    } = options;
    
    processorRunners = processorRunners || await getProcessorRunners(processors, load);
    processorRunners = processorRunners.map(addGlobs);
    
    let processedSource = '';
    let processedPlaces = [];
    let isProcessed = false;
    let fileList = [];
    let allPlaces = [];
    let merge = null;
    
    ({
        fileList,
        merge,
        isProcessed,
        processedSource,
        processedPlaces,
    } = await getFiles({
        name,
        fix,
        rawSource,
        processorRunners,
    }));
    
    ({
        processedSource,
        allPlaces,
    } = await iterate({
        name,
        merge,
        fileList,
        options,
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

async function iterate({name, fileList, merge, processFile, processedSource, options}) {
    let codeChanged = false;
    
    const allPlaces = [];
    const branchedList = [];
    
    for (const {source, startLine = 0, extension} of fileList) {
        const processedName = addExtension(name, extension);
        
        const {code, places} = await processFile({
            name: processedName,
            source,
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
    const processedPlaces = [];
    
    let isProcessed = false;
    let processedSource = '';
    let merge = null;
    
    for (const currentRunner of processorRunners) {
        let places = [];
        
        const {
            isMatch,
            branch = returns([]),
            find = returns([]),
            fix: fixFind = id,
            merge: runnersMerge = id,
            lint,
        } = currentRunner;
        
        if (!isMatch(name))
            continue;
        
        merge = runnersMerge;
        
        isProcessed = true;
        
        if (lint)
            [processedSource, places] = await lint(rawSource, {
                fix,
            });
        else if (fix)
            processedSource = await fixFind(rawSource);
        else
            places = await find(rawSource);
        
        if (!processedSource)
            processedSource = rawSource;
        
        processedPlaces.push(...places);
        
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
async function getProcessorRunners(processors, load) {
    return await loadProcessorsAsync({processors}, load);
}

const addStar = (a) => `**/${a}`;

module.exports._addGlobs = addGlobs;
function addGlobs(processor) {
    const {files} = processor;
    const winFiles = maybeArray(files).map(addStar);
    
    return {
        ...processor,
        isMatch: picomatch(winFiles, {
            dot: true,
            matchBase: true,
        }),
    };
}
