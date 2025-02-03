'use strict';

const Report = require('@putout/engine-reporter/report');

const initProcessFile = require('@putout/cli-process-file');
const {runWriter} = require('./writer.js');

const report = Report();

module.exports.run = async ({transform, plugins, noConfig, readFile, writeFile, exit, isStop, wasStop, names, write, log, rulesdir, fix, processorRunners, fileCache, currentFormat, formatterOptions, options, raw, trace}) => {
    const processFile = initProcessFile(options);
    const {length} = names;
    const places = [];
    
    for (let index = 0; index < length; index++) {
        if (wasStop())
            break;
        
        wasStop(isStop());
        
        const currentIndex = isStop() ? length - 1 : index;
        const name = names[index];
        
        const {exited, places: currentPlaces = []} = await runWriter({
            readFile,
            writeFile,
            exit,
            fix,
            processorRunners,
            rulesdir,
            currentFormat,
            formatterOptions,
            index: currentIndex,
            name,
            count: length,
            processFile,
            fileCache,
            raw,
            write,
            log,
            report,
            noConfig,
            plugins,
            transform,
            trace,
        });
        
        places.push(...currentPlaces);
        
        if (exited)
            return {
                exited,
                places,
            };
    }
    
    return {
        places,
    };
};
