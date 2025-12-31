import {normalize} from 'node:path';
import {lstat as _lstat} from 'node:fs/promises';
import _fastGlob from 'fast-glob';
import {tryToCatch} from 'try-to-catch';
import {getSupportedGlob as _getSupportedGlob} from './supported-files.js';

const rmDuplicates = (a) => Array.from(new Set(a));
const unixifyPath = (a) => !a.includes('\\') ? a : a.replace(/\\/g, '/');

export const getFiles = async (args, options, overrides = {}) => {
    const {
        fastGlob = _fastGlob,
        lstat = _lstat,
        getSupportedGlob = _getSupportedGlob,
    } = overrides;
    
    return await tryToCatch(getFilesProcessor, args, options, {
        fastGlob,
        lstat,
        getSupportedGlob,
    });
};

async function getFilesProcessor(args, options, overrides) {
    const promises = args.map(addExt(options, overrides));
    const files = await Promise.all(promises);
    const mergedFiles = files.flat();
    
    return rmDuplicates(mergedFiles).map(normalize);
}

const globOptions = {
    unique: true,
    dot: true,
};

const addExt = (options, overrides = {}) => async function addExt(a) {
    const {
        fastGlob,
        lstat,
        getSupportedGlob,
    } = overrides;
    
    const [[e], files] = await Promise.all([
        tryToCatch(lstat, a),
        safeGlob(a, fastGlob, {
            onlyFiles: false,
            ...options,
        }),
    ]);
    
    if (e && e.code === 'ENOENT' && !files.length)
        return throwNotFound(a);
    
    const jsFiles = [];
    const promises = [];
    
    for (const file of files) {
        const info = await lstat(file);
        
        if (info.isDirectory()) {
            const glob = getSupportedGlob(file);
            promises.push(await safeGlob(glob, fastGlob, options));
            continue;
        }
        
        jsFiles.push(file);
    }
    
    const promiseResults = !promises.length ? [] : await Promise.all(promises);
    
    const result = [
        ...jsFiles,
        ...promiseResults.flat(),
    ];
    
    return result;
};

function throwNotFound(a) {
    throw Error(`No files matching the pattern '${a}' were found`);
}

async function safeGlob(glob, fastGlob, options) {
    const result = await fastGlob(unixifyPath(glob), {
        ...options,
        ...globOptions,
    });
    
    return result;
}
