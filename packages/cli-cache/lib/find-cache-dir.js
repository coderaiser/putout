import {join} from 'node:path';
import {mkdir as _mkdir} from 'node:fs/promises';
import {findUp as _findUp} from './find-up.js';

export async function findCacheDir(overrides = {}) {
    const {
        name,
        findUp = _findUp,
        mkdir = _mkdir,
        directory = 'node_modules',
    } = overrides;
    
    const path = await findUp(directory);
    
    if (!path)
        return path;
    
    const cacheDir = join(path, '.cache', name);
    
    await mkdir(cacheDir, {
        recursive: true,
    });
    
    return cacheDir;
}
