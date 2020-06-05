'use strict';

const {lstat} = require('fs').promises;

const fastGlob = require('fast-glob');
const tryToCatch = require('try-to-catch');

const {getJSGlob} = require('./supported-files');

const mergeArrays = (a) => [].concat(...a);
const rmDuplicates = (a) => Array.from(new Set(a));

module.exports = async (args) => {
    return await tryToCatch(getFiles, args);
};

async function getFiles(args) {
    const promises = args.map(addExt);
    const files = await Promise.all(promises);
    const mergedFiles = mergeArrays(files);
    
    return rmDuplicates(mergeArrays(mergedFiles));
}

async function addExt(a) {
    const [[e], files] = await Promise.all([
        tryToCatch(lstat, a),
        fastGlob(a, {
            onlyFiles: false,
        }),
    ]);
    
    if (e && e.code === 'ENOENT' && !files.length)
        return throwNotFound(a);
    
    const jsFiles = [];
    const promises = [];
    for (const file of files) {
        const info = await lstat(file);
        
        if (info.isDirectory()) {
            promises.push(fastGlob(getJSGlob(file)));
            continue;
        }
        
        jsFiles.push(file);
    }
    
    const promiseResults = !promises.length ? [] : await Promise.all(promises);
    
    const result = [
        ...jsFiles,
        ...mergeArrays(promiseResults),
    ];
    
    return result;
}

function throwNotFound(a) {
    throw Error(`No files matching the pattern "${a}" were found`);
}

