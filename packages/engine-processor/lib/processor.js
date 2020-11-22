'use strict';

const {extname} = require('path');
const {loadProcessors} = require('@putout/engine-loader');

const defaultProcessors = [
    'javascript',
];

const addExtension = (name, ext) => !ext ? name : `${name}{${ext}}`;
const stubProcess = (a) => [a, []];

module.exports.defaultProcessors = defaultProcessors;

module.exports.getExtensions = (processors) => {
    const result = [];
    
    for (const {extensions} of processors) {
        result.push(...extensions);
    }
    
    return result;
};

module.exports.runProcessors = async ({name, fix, processFile, options, rawSource, index, length}) => {
    const allPlaces = [];
    const ext = extname(name).slice(1);
    const {
        processors = defaultProcessors,
    } = options;
    
    const loadedProcessors = loadProcessors({
        processors,
    });
    
    let processedSource = '';
    let processedPlaces = [];
    let isProcessed = false;
    
    for (const {extensions, preProcess, postProcess, process = stubProcess} of loadedProcessors) {
        if (!extensions.includes(ext))
            continue;
        
        [processedSource, processedPlaces] = process(rawSource);
        
        if (fix)
            processedPlaces = [];
        else
            processedSource = rawSource;
        
        const list = preProcess(processedSource);
        const preProcessedList = [];
        
        let isJsChanged = false;
        for (const {source, startLine, extension} of list) {
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

