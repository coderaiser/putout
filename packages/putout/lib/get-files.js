'use strict';

const {statSync} = require('fs');

const glob = require('glob');
const tryCatch = require('try-catch');

const mergeArrays = (a) => [].concat(...a);
const one = (f) => (a) => f(a);
const rmDuplicates = (a) => Array.from(new Set(a));

module.exports = (args) => {
    return tryCatch(getFiles, args);
};

function getFiles(args) {
    const files = args
        .map(addExt)
        .map(one(glob.sync));
    
    return rmDuplicates(mergeArrays(files));
}

function addExt(a) {
    const [e, file] = tryCatch(statSync, a);
    
    if (e && e.code === 'ENOENT' && !glob.sync(a).length)
        return throwNotFound(a);
    
    if (e)
        return a;
    
    const isDir = file.isDirectory();
    
    if (isDir)
        return `${a}/**/*.{js,jsx,ts}`;
    
    return a;
}

function throwNotFound(a) {
    throw Error(`No files matching the pattern "${a}" were found`);
}

