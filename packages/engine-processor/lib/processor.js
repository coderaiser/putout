'use strict';

const {loadProcessors} = require('@putout/engine-loader');
const picomatch = require('picomatch');

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

module.exports.runProcessors = async ({name, fix, processFile, options, rawSource, index, length}) => {
    const allPlaces = [];
    const {
        processors = defaultProcessors,
    } = options;
    
    const loadedProcessors = loadProcessors({
        processors,
    });
    
    let processedSource = '';
    let processedPlaces = [];
    let isProcessed = false;
    
    for (const {files, preProcess, postProcess, process = stubProcess} of loadedProcessors) {
        if (!isMatchName(name, files))
            continue;
        
        [processedSource, processedPlaces] = process(rawSource);
        
        if (fix)
            processedPlaces = [];
        else
            processedSource = rawSource;
        
        const list = preProcess(processedSource);
        const preProcessedList = [];
        
        let isJsChanged = false;
        for (const {source, startLine = 0, extension} of list) {
            const processedName = addExtension(name, extension);
            const {code, places} = await processFile({
                name: processedName,
                source,
                rawSource,
                options,
                index,
                length,
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
    
    return {
        places: allPlaces,
        processedSource,
        isProcessed,
    };
};

function isMatchName(name, files) {
    for (const current of files) {
        const isMatch = picomatch(current, {
            dot: true,
            matchBase: true,
        });
        
        if (isMatch(name))
            return true;
    }
    
    return false;
}
