'use strict';

const {operator} = require('putout');
const {join} = require('path');

const {parse} = JSON;
const {
    getParentDirectory,
    getFilename,
    readFileContent,
    findFile,
    renameFile,
} = operator;

module.exports.report = (file, {mjs, js}) => `Rename '${mjs}' to '${js}'`;

module.exports.fix = (file, {js}) => {
    renameFile(file, js);
};

module.exports.scan = (path, {push}) => {
    for (const file of findFile(path, '*.mjs')) {
        const packagePath = findUpPackage(file);
        
        if (!packagePath)
            continue;
        
        const packageContent = readFileContent(packagePath);
        
        if (!packageContent)
            continue;
        
        const {type} = parse(packageContent);
        
        if (type !== 'module')
            continue;
        
        const mjs = getFilename(file);
        const js = mjs.replace(/mjs$/, 'js');
        
        push(file, {
            mjs,
            js,
        });
    }
};

function findUpPackage(file) {
    let packageJSON;
    let dirPath = getParentDirectory(file);
    
    do {
        const dir = getFilename(dirPath);
        [packageJSON] = findFile(dirPath, join(dir, 'package.json'));
    } while (!packageJSON && (dirPath = getParentDirectory(dirPath)));
    
    return packageJSON;
}
