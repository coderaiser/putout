'use strict';

const {loadProcessors} = require('@putout/engine-loader');
const memo = require('nano-memoize');
const picomatch = memo(require('picomatch'));

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
    
    for (const currentProcessor of loadedProcessors) {
        const {
            isMatch,
            postProcess,
            preProcess = stubPreProcess,
            process = stubProcess,
        } = currentProcessor;
        
        if (!isMatch(name))
            continue;
        
        [processedSource, processedPlaces] = await process(rawSource, {
            fix,
        });
        
        const list = await preProcess(processedSource);
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

