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

module.exports.report = ({cjs, js}) => `Rename '${cjs}' to '${js}'`;

module.exports.fix = ({path, js}) => {
    renameFile(path, js);
};

module.exports.traverse = ({push}) => ({
    [__filesystem]: (path) => {
        for (const file of findFile(path, '*.cjs')) {
            const packagePath = findUpPackage(file);
            
            const cjs = getFilename(file);
            const js = cjs.replace(/cjs$/, 'js');
            
            if (!packagePath) {
                push({
                    path: file,
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
            
            push({
                path: file,
                cjs,
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
