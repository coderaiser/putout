'use strict';

const {normalize} = require('node:path');
const {lstat} = require('node:fs/promises');

const fastGlob = require('fast-glob');
const tryToCatch = require('try-to-catch');

const {getSupportedGlob} = require('./supported-files');

const rmDuplicates = (a) => Array.from(new Set(a));
const unixifyPath = (a) => !a.includes('\\') ? a : a.replace(/\\/g, '/');

module.exports = async (args, options) => {
    return await tryToCatch(getFiles, args, options);
};

async function getFiles(args, options) {
    const promises = args.map(addExt(options));
    const files = await Promise.all(promises);
    const mergedFiles = files.flat();
    
    return rmDuplicates(mergedFiles).map(normalize);
}

const globOptions = {
    unique: true,
    dot: true,
};

const addExt = (options) => async function addExt(a) {
    const [[e], files] = await Promise.all([
        tryToCatch(lstat, a),
        safeGlob(a, {
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
            promises.push(await safeGlob(glob, options));
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

async function safeGlob(glob, options) {
    const result = await fastGlob(unixifyPath(glob), {
        ...options,
        ...globOptions,
    });
    
    return result;
}
