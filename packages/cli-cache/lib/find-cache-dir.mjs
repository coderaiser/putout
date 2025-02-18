import {join} from 'node:path';
import {mkdir as _mkdir} from 'node:fs/promises';
import process from 'node:process';
import {findNodeModules} from './find-node-modules.mjs';

const {cwd: _cwd} = process;

export default async function findCacheDir(overrides = {}) {
    const {
        name,
        cwd = _cwd,
        mkdir = _mkdir,
        directory = 'node_modules',
    } = overrides;
    
    const path = await findNodeModules({
        cwd,
        directory,
    });
    
    if (!path)
        return path;
    
    const cacheDir = join(path, '.cache', name);
    
    await mkdir(cacheDir, {
        recursive: true,
    });
    
    return cacheDir;
}
