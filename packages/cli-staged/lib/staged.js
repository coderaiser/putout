import {join} from 'node:path';
import {spawnSync as _spawnSync} from 'node:child_process';
import _porcelain from '@putout/git-status-porcelain';
import fullstore from 'fullstore';

const namesStore = fullstore([]);

const findGit = async ({findUp}) => {
    const type = 'directory';
    const gitDir = await findUp('.git', {
        type,
    });
    
    if (!gitDir)
        throw Error('not git repository');
    
    return gitDir.replace(/\.git$/, '');
};

const joinDir = (a) => (b) => join(a, b);

export const get = async function get(overrides = {}) {
    const {
        findUp,
        isSupported,
        porcelain = _porcelain,
    } = overrides;
    
    const dir = await findGit({
        findUp,
    });
    
    const names = porcelain({
        modified: true,
        added: true,
        renamed: true,
    }).filter(isSupported);
    
    namesStore(names);
    
    return names.map(joinDir(dir));
};

export const set = async function set(overrides = {}) {
    const {
        findUp,
        porcelain = _porcelain,
        spawnSync = _spawnSync,
    } = overrides;
    
    const dir = await findGit({
        findUp,
    });
    
    const names = namesStore();
    
    const staged = porcelain({
        unstaged: true,
    });
    
    const namesToAdd = [];
    
    for (const filepath of names) {
        if (!staged.includes(filepath))
            namesToAdd.push(filepath);
    }
    
    if (namesToAdd.length)
        add(namesToAdd.map(joinDir(dir)), {
            spawnSync,
        });
    
    return staged;
};

function add(names, {spawnSync}) {
    spawnSync('git', [
        'add',
        ...names,
    ]);
}
