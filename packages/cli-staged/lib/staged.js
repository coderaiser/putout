'use strict';

const {join} = require('path');
const {spawnSync} = require('child_process');

const porcelain = require('@putout/git-status-porcelain');
const once = require('once');
const fullstore = require('fullstore');

const namesStore = fullstore([]);

const findGit = once(async ({findUp}) => {
    const type = 'directory';
    
    const gitDir = await findUp('.git', {
        type,
    });
    
    if (!gitDir)
        throw Error('not git repository');
    
    const dir = gitDir.replace(/\.git$/, '');
    
    return dir;
});

const joinDir = (a) => (b) => join(a, b);

module.exports.get = async function get({findUp, isSupported}) {
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

module.exports.set = async function set({findUp}) {
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
        add(namesToAdd.map(joinDir(dir)));
    
    return staged;
};

function add(names) {
    spawnSync('git', ['add', ...names]);
}
