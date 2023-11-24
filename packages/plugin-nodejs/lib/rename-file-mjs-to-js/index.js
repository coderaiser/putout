'use strict';

const {operator} = require('putout');
const {join} = require('path');

const {parse} = JSON;
const {
    getParentDirectory,
    getFilename,
    readFileContent,
    findFile,
    __filesystem,
    renameFile,
} = operator;

module.exports.report = ({mjs, js}) => `Rename '${mjs}' to '${js}'`;

module.exports.fix = ({path, js}) => {
    renameFile(path, js);
};

module.exports.traverse = ({push}) => ({
    [__filesystem]: (path) => {
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
            
            push({
                path: file,
                mjs,
                js,
            });
        }
    },
});

function findUpPackage(file) {
    let packageJSON;
    let dirPath = getParentDirectory(file);
    
    do {
        const dir = getFilename(dirPath);
        [packageJSON] = findFile(dirPath, join(dir, 'package.json'));
    } while (!packageJSON && (dirPath = getParentDirectory(dirPath)));
    
    return packageJSON;
}
