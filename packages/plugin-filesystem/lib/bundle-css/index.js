'use strict';

const {basename} = require('path');
const {operator} = require('putout');

const {minify} = require('./minify');
const {
    getFilename,
    findFile,
    writeFileContent,
    createDirectory,
    createFile,
    readFileContent,
} = operator;

const maybeArray = (a) => isArray(a) ? a : [a];

const {entries} = Object;
const {isArray} = Array;

module.exports.report = () => `Minify css`;
module.exports.fix = (rootPath, {dist, transform, fileGroups, config}) => {
    const distDirectory = createDirectory(rootPath, dist);
    
    for (const [name, file] of entries(fileGroups)) {
        if (isArray(file)) {
            const result = file.map(readFileContent);
            createFile(distDirectory, name, transform(result.join('\n'), config));
            
            continue;
        }
        
        if (!name.includes('/')) {
            const newFile = createFile(distDirectory, name);
            const data = readFileContent(file);
            
            writeFileContent(newFile, transform(data, config));
            continue;
        }
        
        const [dir, newName] = name.split('/');
        const newDir = createDirectory(distDirectory, dir);
        const newFile = createFile(newDir, newName);
        const data = readFileContent(file);
        
        writeFileContent(newFile, transform(data, config));
    }
};

const mark = (a) => a.__putout_filesystem_processed = true;
const isMarked = (a) => a.__putout_filesystem_processed;

module.exports.scan = (rootPath, {push, options}) => {
    const {
        transform = minify,
        groups = [],
        dist = 'dist',
        mask = '*.css',
        config = {},
    } = options;
    
    const [distDirectory] = findFile(rootPath, dist);
    
    if (distDirectory)
        return;
    
    if (!groups.length)
        return;
    
    const files = findFile(rootPath, mask);
    const fileGroups = {};
    
    for (const file of files) {
        for (const group of groups) {
            if (isMarked(file))
                continue;
            
            const [main, list] = maybeArray(group);
            const filename = getFilename(file);
            const base = basename(filename);
            
            if (main === base && list) {
                fileGroups[main] = [];
                mark(file);
                continue;
            }
            
            if (main === base && !list) {
                mark(file);
                fileGroups[base] = file;
                continue;
            }
            
            if (main === '1:1') {
                fileGroups[base] = file;
                mark(file);
                continue;
            }
            
            if (main.includes(':') && list?.includes(base)) {
                const [, after] = main.split(':');
                
                fileGroups[after.replace('__', base)] = file;
                mark(file);
                continue;
            }
            
            if (list?.includes(base)) {
                fileGroups[main] = fileGroups[main] || [];
                fileGroups[main].push(file);
                mark(file);
                continue;
            }
        }
    }
    
    push(rootPath, {
        fileGroups,
        dist,
        transform,
        config,
    });
};
