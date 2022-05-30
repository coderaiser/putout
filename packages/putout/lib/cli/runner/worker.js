'use strict';

const {resolve} = require('path');
const {
    cwd,
    env,
} = require('process');
const tryCatch = require('try-catch');
const {readFileSync} = require('fs');
const tryToCatch = require('try-to-catch');
const {runProcessors} = require('@putout/engine-processor');

const parseError = require('../parse-error.js');
const getOptions = require('../get-options.js');
const {simpleImport} = require('../simple-import');
const {
    INVALID_CONFIG,
    NO_PROCESSORS,
} = require('../exit-codes.js');
const ignores = require('../../ignores.js');

const isParser = (rule) => rule.startsWith('parser');
const isParsingError = ({rule}) => isParser(rule);
const chooseName = (name, resolvedName) => !isIDE ? name : resolvedName;
const isIDE = /JetBrains/.test(env.TERMINAL_EMULATOR) || env.TERM_PROGRAM === 'vscode';

const createFormatterProxy = (options) => {
    return new Proxy(options, {
        get(target, name) {
            if (target[name])
                return target[name];
            
            if (name === 'source')
                return readFileSync(target.name, 'utf8');
        },
    });
};

module.exports = async ({readFile, report, writeFile, exit, raw, write, log, currentFormat, rulesdir, formatterOptions, noConfig, transform, plugins, index, fix, processFile, processorRunners, fileCache, rawPlaces, name, count}) => {
    const resolvedName = resolve(name)
        .replace(/^\./, cwd);
    
    const [configError, options] = tryCatch(getOptions, {
        name,
        rulesdir,
        noConfig,
        transform,
        plugins,
    });
    
    if (configError)
        return exit(INVALID_CONFIG, configError);
    
    const {dir} = options;
    const success = await runCache({
        options,
        fileCache,
        report,
        write,
        formatterOptions,
        currentFormat,
        name,
        resolvedName,
        index,
        count,
        rawPlaces,
    });
    
    if (success)
        return {
            success,
        };
    
    let isProcessed = true;
    let places = [];
    let rawSource = '';
    let processedSource = '';
    
    if (!ignores(dir, resolvedName, options)) {
        rawSource = await readFile(resolvedName, 'utf8');
        
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
        } else {
            ({
                isProcessed,
                places,
                processedSource,
            } = result);
        }
    }
    
    const line = await report(currentFormat, {
        report,
        formatterOptions,
        name: chooseName(name, resolvedName),
        source: rawSource,
        places,
        index,
        count,
    });
    
    write(line || '');
    
    if (!isProcessed)
        return exit(NO_PROCESSORS, Error(`No processors found for ${name}`));
    
    if (rawSource !== processedSource) {
        fileCache.removeEntry(name);
        await writeFile(name, processedSource);
    }
    
    const fixable = !places.filter(isParsingError).length;
    
    if (fixable)
        fileCache.setInfo(name, places, options);
    
    rawPlaces.push(places);
    
    return {
        rawPlaces,
        success: true,
    };
};

async function runCache({fileCache, report, write, formatterOptions, currentFormat, name, resolvedName, index, count, rawPlaces, options}) {
    if (!fileCache.canUseCache(name, options))
        return false;
    
    const places = fileCache.getPlaces(name);
    const formatterProxy = createFormatterProxy({
        report,
        formatterOptions,
        name: chooseName(name, resolvedName),
        places,
        index,
        count,
    });
    
    const line = await report(currentFormat, formatterProxy);
    
    write(line || '');
    rawPlaces.push(places);
    
    return true;
}

