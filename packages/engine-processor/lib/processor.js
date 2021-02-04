'use strict';

const typos = require('@putout/processor-typos');
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
    const allPlaces = [];
    const {
        processors = defaultProcessors,
    } = options;
    
    processorRunners = processorRunners || getProcessorRunners(processors);
    
    let processedSource = '';
    let processedPlaces = [];
    let isProcessed = false;
    let isJsChanged = false;
    
    for (const currentRunner of processorRunners) {
        const {
            isMatch,
            postProcess,
            preProcess = stubPreProcess,
            process = stubProcess,
        } = currentRunner;
        
        if (!isMatch(name))
            continue;
        
        [processedSource, processedPlaces] = await process(rawSource, {
            fix,
        });
        
        if (!processedSource)
            processedSource = rawSource;
        
        const list = await preProcess(processedSource);
        const preProcessedList = [];
        
        isJsChanged = false;
        for (const {source, startLine = 0, extension} of list) {
            const [typosFreeSource, typosPlaces] = await typos.process(source, {fix});
            
            if (typosPlaces.length) {
                preProcessedList.push(source);
                allPlaces.push(...typosPlaces);
                isJsChanged = true;
                
                continue;
            }
            
            console.log(typosFreeSource);
            
            const processedName = addExtension(name, extension);
            const {code, places} = await processFile({
                name: processedName,
                source: typosFreeSource,
                rawSource,
                options,
                startLine,
            });
            
            preProcessedList.push(code);
            allPlaces.push(...places);
            
            if (places.length || code !== source)
                isJsChanged = true;
        }
        
        if (isJsChanged)
            processedSource = await postProcess(rawSource, preProcessedList);
        
        isProcessed = true;
        allPlaces.push(...processedPlaces);
    }
    
    if (!fix)
        processedSource = rawSource;
    
    return {
        places: allPlaces,
        processedSource,
        isProcessed,
    };
};

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

