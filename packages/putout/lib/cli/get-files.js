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
    const files = [];
    
    for (const arg of args)
        files.push(...addExt(arg));
    
    const globbed = files.map(one(glob.sync));
    
    return rmDuplicates(mergeArrays(globbed));
}

function addExt(a) {
    const [e] = tryCatch(statSync, a);
    const files = glob.sync(a);
    
    if (e && e.code === 'ENOENT' && !files.length)
        return throwNotFound(a);
    
    const result = [];
    for (const file of files) {
        if (/\.(js|jsx|ts)$/.test(file)) {
            result.push(file);
            continue;
        }
        
        result.push(`${file}/**/*.{js,jsx,ts}`);
    }
    
    return result;
}

function throwNotFound(a) {
    throw Error(`No files matching the pattern "${a}" were found`);
}

