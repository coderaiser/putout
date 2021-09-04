'use strict';

const {join} = require('path');
const fs = require('fs');

const git = require('isomorphic-git');
const once = require('once');
const fullstore = require('fullstore');

const {isSupported} = require('./supported-files');

const STAGED_INDEX = 3;
const STAGED = 2;
const STAGED_WITH_CHANGES = 3;

const MODIFIED_INDEX = 2;
const MODIFIED = 2;

const namesStore = fullstore([]);
const isStagedStr = (statuses) => (name) => /^\*?(added|modified)$/.test(statuses[name]);

const {fromEntries} = Object;

const findGit = once(async ({findUp}) => {
    const type = 'directory';
    
    const gitDir = await findUp('.git', {
        type,
    });
    
    const dir = gitDir.replace(/\.git$/, '');
    
    return dir;
});

const isStaged = (a) => a[STAGED_INDEX] === STAGED || a[STAGED_INDEX] === STAGED_WITH_CHANGES;
const isModified = (a) => a[MODIFIED_INDEX] === MODIFIED;
const head = ([a]) => a;
const joinDir = (a) => (b) => join(a, b);

module.exports.get = async function get({findUp}) {
    const dir = await findGit({findUp});
    
    if (!dir)
        return [];
    
    const status = await git.statusMatrix({
        fs,
        dir,
        filter: isSupported,
    });
    
    const names = status
        .filter(isStaged)
        .filter(isModified)
        .map(head);
    
    namesStore(names);
    
    return names.map(joinDir(dir));
};

async function getStatus(dir, filepath) {
    const status = await git.status({
        fs,
        dir,
        filepath,
    });
    
    return [filepath, status];
}

module.exports.set = async function set({findUp}) {
    const dir = await findGit({findUp});
    
    if (!dir)
        return;
    
    const names = namesStore();
    const statusPromises = [];
    
    for (const filepath of names) {
        statusPromises.push(await getStatus(dir, filepath));
    }
    
    const statuses = fromEntries(await Promise.all(statusPromises));
    const staged = names.filter(isStagedStr(statuses));
    const promises = [];
    
    for (const filepath of names)
        promises.push(git.add({
            fs,
            dir,
            filepath,
        }));
    
    await Promise.all(promises);
    
    return staged;
};

