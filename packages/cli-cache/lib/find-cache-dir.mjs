import {join} from 'node:path';
import {mkdir as _mkdir} from 'node:fs/promises';
import process from 'node:process';
import _escalade from 'escalade';

const {cwd: _cwd} = process;

const includesName = (directory) => (dir, names) => {
    return names.includes(directory) && join(dir, directory);
};

export default async function findCacheDir(overrides = {}) {
    const {
        name,
        cwd = _cwd,
        escalade = _escalade,
        mkdir = _mkdir,
        directory = 'node_modules',
    } = overrides;
    const input = join(cwd(), 'package.json');
    const path = await escalade(input, includesName(directory));
    
    if (!path)
        return path;
    
    const cacheDir = join(path, '.cache', name);
    
    await mkdir(cacheDir, {
        recursive: true,
    });
    
    return cacheDir;
}
