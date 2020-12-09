'use strict';

const {loadProcessors} = require('@putout/engine-loader');
const memo = require('nano-memoize');
const picomatch = memo(require('picomatch'));

const defaultProcessors = [
    'javascript',
];

const addExtension = (name, ext) => !ext ? name : `${name}{${ext}}`;
const stubProcess = (a) => [a, []];

module.exports.defaultProcessors = defaultProcessors;

module.exports.getFilePatterns = (processors) => {
    const result = [];
    
    for (const {files} of processors) {
        result.push(...files);
    }
    
    return result;
};

module.exports.runProcessors = async ({name, fix, processFile, options, rawSource}) => {
    const allPlaces = [];
    const {
        processors = defaultProcessors,
    } = options;
    
    const loadedProcessors = loadProcessors({
        processors,
    }).map(addGlobs);
    
    let processedSource = '';
    let processedPlaces = [];
    let isProcessed = false;
    let isJsChanged = false;
    
    for (const {isMatch, preProcess, postProcess, process = stubProcess} of loadedProcessors) {
        if (!isMatch(name))
            continue;
        
        [processedSource, processedPlaces] = process(rawSource);
        
        const list = preProcess(processedSource);
        const preProcessedList = [];
        
        isJsChanged = false;
        for (const {source, startLine = 0, extension} of list) {
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
            allPlaces.push(...processedPlaces);
            
            if (places.length || code !== source)
                isJsChanged = true;
        }
        
        if (isJsChanged)
            processedSource = postProcess(rawSource, preProcessedList);
        
        isProcessed = true;
    }
    
    if (!fix || !isJsChanged)
        processedSource = rawSource;
    
    return {
        places: allPlaces,
        processedSource,
        isProcessed,
    };
};

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

