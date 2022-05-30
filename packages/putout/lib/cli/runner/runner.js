'use strict';

const runWorker = require('./worker.js');
const initProcessFile = require('../process-file.js');
const Report = require('../report.js');

const report = Report();

module.exports.run = async ({transform, plugins, noConfig, readFile, writeFile, exit, isStop, wasStop, names, write, log, rulesdir, fix, processorRunners, fileCache, currentFormat, formatterOptions, options, raw}) => {
    const processFile = initProcessFile(options);
    const {length} = names;
    const rawPlaces = [];
    
    for (let index = 0; index < length; index++) {
        if (wasStop())
            break;
        
        wasStop(isStop());
        const currentIndex = isStop() ? length - 1 : index;
        const name = names[index];
        
        const {exited} = await runWorker({
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
            rawPlaces,
            processFile,
            fileCache,
            raw,
            write,
            log,
            report,
            noConfig,
            plugins,
            transform,
        });
        
        if (exited)
            return {exited, rawPlaces};
    }
    
    return {rawPlaces};
};
