'use strict';

const {basename} = require('node:path');
const {operator} = require('putout');
const id = (a) => a;

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
module.exports.fix = (rootPath, {dist, fileGroups}) => {
    const distDirectory = createDirectory(rootPath, dist);
    
    for (const [name, content] of entries(fileGroups)) {
        if (isArray(content)) {
            createFile(distDirectory, name, content.join('\n'));
            continue;
        }
        
        if (!name.includes('/')) {
            const newFile = createFile(distDirectory, name);
            writeFileContent(newFile, content);
            continue;
        }
        
        const [dir, newName] = name.split('/');
        const newDir = createDirectory(distDirectory, dir);
        const newFile = createFile(newDir, newName);
        
        writeFileContent(newFile, content);
    }
};

const mark = (a) => a.__putout_filesystem_processed = true;
const isMarked = (a) => a.__putout_filesystem_processed;
const process = (file, transform, config) => transform(readFileContent(file), config);

module.exports.scan = (rootPath, {push, options}) => {
    const {
        transform = id,
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
                fileGroups[base] = process(file, transform, config);
                continue;
            }
            
            if (main === '1:1') {
                fileGroups[base] = process(file, transform, config);
                mark(file);
                continue;
            }
            
            if (main.includes(':') && list?.includes(base)) {
                const [, after] = main.split(':');
                
                fileGroups[after.replace('__', base)] = process(file, transform, config);
                mark(file);
                continue;
            }
            
            if (list?.includes(base)) {
                fileGroups[main] = fileGroups[main] || [];
                fileGroups[main].push(process(file, transform, config));
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
