'use strict';

const {resolve} = require('path');
const {
    cwd,
    env,
} = require('process');
const tryCatch = require('try-catch');
const {readFileSync} = require('fs');

const getOptions = require('../get-options.js');
const {
    INVALID_CONFIG,
    NO_PROCESSORS,
} = require('../exit-codes.js');
const {lint} = require('./lint.js');

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

module.exports = async ({readFile, report, writeFile, exit, raw, write, log, currentFormat, rulesdir, formatterOptions, noConfig, transform, plugins, index, fix, processFile, processorRunners, fileCache, name, count}) => {
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
    });
    
    if (success)
        return {
            success,
        };
    
    const {
        places,
        isProcessed,
        rawSource,
        processedSource,
    } = await lint({
        raw,
        dir,
        fix,
        options,
        processorRunners,
        log,
        readFile,
        processFile,
        resolvedName,
    });
    
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
    
    return {
        places,
        success: true,
    };
};

async function runCache({fileCache, report, write, formatterOptions, currentFormat, name, resolvedName, index, count, options}) {
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
    
    return true;
}

