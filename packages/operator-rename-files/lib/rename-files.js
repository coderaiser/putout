'use strict';

const {join} = require('node:path');

const {
    getParentDirectory,
    getFilename,
    readFileContent,
    findFile,
    renameFile,
} = require('@putout/operator-filesystem');

const {parse} = JSON;

module.exports.renameFiles = ({type, mask, rename}) => ({
    report,
    fix,
    scan: scan({
        type,
        mask,
        rename,
    }),
});

const report = (file, {from, to}) => `Rename '${from}' to '${to}'`;

const fix = (file, {to}) => {
    renameFile(file, to);
};

const scan = ({type, mask, rename}) => (path, {push, trackFile}) => {
    for (const file of trackFile(path, mask)) {
        if (type && !checkType(type, file))
            continue;
        
        const from = getFilename(file);
        const to = rename(from);
        
        push(file, {
            from,
            to,
        });
    }
};

function checkType(type, file) {
    const packagePath = findUpPackage(file);
    
    if (type === 'commonjs' && !packagePath)
        return true;
    
    if (!packagePath)
        return false;
    
    const packageContent = readFileContent(packagePath);
    
    if (!packageContent)
        return false;
    
    const info = parse(packageContent);
    const infoType = info.type || 'commonjs';
    
    return infoType === type;
}

function findUpPackage(file) {
    let packageJSON;
    let dirPath = getParentDirectory(file);
    
    do {
        const dir = getFilename(dirPath);
        [packageJSON] = findFile(dirPath, join(dir, 'package.json'));
    } while (!packageJSON && (dirPath = getParentDirectory(dirPath)));
    
    return packageJSON;
}
