'use strict';

const tryToCatch = require('try-to-catch');
const {runProcessors} = require('@putout/engine-processor');

const parseError = require('../../parse-error.js');
const {simpleImport} = require('../simple-import');
const ignores = require('../../ignores.js');

module.exports.runReader = async ({raw, log, dir, resolvedName, options, readFile, fix, processFile, processorRunners}) => {
    let isProcessed = true;
    let places = [];
    let rawSource = '';
    let processedSource = '';
    
    if (ignores(dir, resolvedName, options))
        return {
            isProcessed,
            places,
            rawSource,
            processedSource,
        };
    
    let readError;
    
    [readError, rawSource] = await tryToCatch(readFile, resolvedName, 'utf8');
    
    if (readError && readError.code !== 'ENOENT')
        places.push({
            rule: 'system',
            message: readError.message,
            position: {
                line: 1,
                column: 0,
            },
        });
    
    if (readError)
        return {
            isProcessed,
            places,
            rawSource,
            processedSource,
        };
    
    const [error, result] = await tryToCatch(runProcessors, {
        name: resolvedName,
        fix,
        processFile,
        options,
        rawSource,
        processorRunners,
        load: simpleImport,
    });
    
    if (error) {
        places = parseError(error);
        
        isProcessed = true;
        processedSource = rawSource;
        
        if (raw)
            log(error);
        
        return {
            places,
            isProcessed,
            processedSource,
            rawSource,
        };
    }
    
    ({
        isProcessed,
        places,
        processedSource,
    } = result);
    
    return {
        isProcessed,
        places,
        processedSource,
        rawSource,
    };
};
