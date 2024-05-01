'use strict';

const {readdir: _readdir} = require('node:fs/promises');
const process = require('node:process');
const {join} = require('node:path');

const {matchToFlatDir} = require('./match-to-flat-dir');
const {readESLintConfig: _readESLintConfig} = require('./read-eslint-config');
const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];
const CWD = process.cwd();

module.exports.mergeESLintConfigs = async (directories, {
    readdir,
    readESLintConfig,
} = {}) => {
    const readers = maybeArray(directories).map(readDirectory({
        readdir,
        readESLintConfig,
    }));
    
    const directoryBlocks = await Promise.all(readers);
    const configs = [];
    
    for (const directoryBlock of directoryBlocks) {
        for (const [dir, config] of directoryBlock) {
            configs.push(await matchToFlatDir(dir, config));
        }
    }
    
    return configs.flat();
};

const readDirectory = ({readdir = _readdir, readESLintConfig = _readESLintConfig}) => async (name) => {
    const names = await readdir(name);
    const importPackages = [];
    
    for (const current of names) {
        const relative = join(name, current);
        const full = join(CWD, relative);
        const config = await readESLintConfig(full);
        
        importPackages.push([relative, config]);
    }
    
    return importPackages;
};
