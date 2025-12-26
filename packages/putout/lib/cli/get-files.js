'use strict';

const {normalize} = require('node:path');
const {lstat: _lstat} = require('node:fs/promises');

const _fastGlob = require('fast-glob');
const tryToCatch = require('try-to-catch');

const {getSupportedGlob: _getSupportedGlob} = require('./supported-files');

const rmDuplicates = (a) => Array.from(new Set(a));
const unixifyPath = (a) => !a.includes('\\') ? a : a.replace(/\\/g, '/');

module.exports = async (args, options, overrides = {}) => {
    const {
        fastGlob = _fastGlob,
        lstat = _lstat,
        getSupportedGlob = _getSupportedGlob,
    } = overrides;
    
    return await tryToCatch(getFiles, args, options, {
        fastGlob,
        lstat,
        getSupportedGlob,
    });
};

async function getFiles(args, options, overrides) {
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
