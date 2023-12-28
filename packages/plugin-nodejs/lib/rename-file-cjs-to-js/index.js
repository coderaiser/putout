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

module.exports.report = (file, {cjs, js}) => `Rename '${cjs}' to '${js}'`;

module.exports.fix = (file, {js}) => {
    renameFile(file, js);
};

module.exports.scan = (path, {push, trackFile}) => {
    for (const file of trackFile(path, '*.cjs')) {
        const packagePath = findUpPackage(file);
        
        const cjs = getFilename(file);
        const js = cjs.replace(/cjs$/, 'js');
        
        if (!packagePath) {
            push(file, {
                cjs,
                js,
            });
            continue;
        }
        
        const packageContent = readFileContent(packagePath);
        
        if (!packageContent)
            continue;
        
        const {type} = parse(packageContent);
        
        if (type === 'module')
            continue;
        
        push(file, {
            cjs,
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
