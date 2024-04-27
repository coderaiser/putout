'use strict';

const {resolve} = require('node:path');
const {cwd, env} = require('node:process');
const {readFileSync} = require('node:fs');

const tryCatch = require('try-catch');
const getOptions = require('../get-options.js');
const {INVALID_CONFIG, NO_PROCESSORS} = require('../exit-codes.js');
const {runReader} = require('./reader.js');

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

module.exports.runWriter = async ({readFile, report, writeFile, exit, raw, write, log, currentFormat, rulesdir, formatterOptions, noConfig, transform, plugins, index, fix, processFile, processorRunners, fileCache, name, count, trace}) => {
    const resolvedName = resolve(name).replace(/^\./, cwd);
    const [configError, options] = tryCatch(getOptions, {
        name: resolvedName,
        rulesdir,
        noConfig,
        transform,
        plugins,
    });
    
    if (configError)
        return exit(INVALID_CONFIG, configError);
    
    const success = await runCache({
        trace,
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
    
    const {dir} = options;
    
    const {
        places,
        isProcessed,
        rawSource,
        processedSource,
    } = await runReader({
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
        formatterOptions,
        name: chooseName(name, resolvedName),
        source: rawSource,
        places,
        index,
        count,
        trace,
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

async function runCache({fileCache, report, write, formatterOptions, currentFormat, name, resolvedName, index, count, options, trace}) {
    if (!fileCache.canUseCache(name, options))
        return false;
    
    const places = fileCache.getPlaces(name);
    const formatterProxy = createFormatterProxy({
        formatterOptions,
        name: chooseName(name, resolvedName),
        places,
        index,
        count,
        trace,
    });
    
    const line = await report(currentFormat, formatterProxy);
    
    write(line || '');
    
    return true;
}
