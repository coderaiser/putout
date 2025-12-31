import {resolve} from 'node:path';
import {cwd, env} from 'node:process';
import {readFileSync} from 'node:fs';
import {tryCatch} from 'try-catch';
import _getOptions from '../get-options.js';
import {INVALID_CONFIG, NO_PROCESSORS} from '../exit-codes.js';
import {runReader} from './reader.js';

const isParser = (rule) => rule.startsWith('parser');
const isParsingError = ({rule}) => isParser(rule);

const chooseName = (name, resolvedName) => !isIDE() ? name : resolvedName;

const isIDE = () => {
    if (/JetBrains/.test(env.TERMINAL_EMULATOR))
        return true;
    
    return env.TERM_PROGRAM === 'vscode';
};

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

export const runWriter = async (overrides = {}) => {
    const {
        readFile,
        report,
        writeFile,
        exit,
        raw,
        write,
        log,
        currentFormat,
        rulesdir,
        formatterOptions,
        noConfig,
        transform,
        plugins,
        index,
        fix,
        processFile,
        processorRunners,
        fileCache,
        name,
        count,
        trace,
        getOptions = _getOptions,
        runProcessors,
    } = overrides;
    
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
        runProcessors,
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
