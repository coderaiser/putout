import {readdir as _readdir} from 'node:fs/promises';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {matchToFlatDir} from './match-to-flat-dir.js';
import {readESLintConfig as _readESLintConfig} from './read-eslint-config.js';

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];

const magicDirname = (name) => {
    if (name.startsWith('file://'))
        return dirname(fileURLToPath(name));
    
    return name;
};

export const mergeESLintConfigs = async (cwd, directories, {readdir, readESLintConfig} = {}) => {
    const readers = maybeArray(directories).map(readDirectory({
        dir: magicDirname(cwd),
        readdir,
        readESLintConfig,
    }));
    
    const directoryBlocks = await Promise.all(readers);
    const configs = [];
    
    for (const directoryBlock of directoryBlocks)
        for (const [dir, config] of directoryBlock)
            configs.push(await matchToFlatDir(cwd, dir, config));
    
    return configs.flat();
};

const readDirectory = ({dir, readdir = _readdir, readESLintConfig = _readESLintConfig}) => async (name) => {
    const fullname = join(dir, name);
    const names = await readdir(fullname);
    const importPackages = [];
    
    for (const current of names) {
        const relative = join(name, current);
        const full = join(dir, relative);
        const config = await readESLintConfig(full);
        
        importPackages.push([relative, config]);
    }
    
    return importPackages;
};
