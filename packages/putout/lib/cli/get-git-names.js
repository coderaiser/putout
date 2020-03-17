'use strict';

const {join} = require('path');

const porcelaine = require('@putout/git-status-porcelain');
const findUp = require('find-up');

const isJS = (a) => /(\.jsx?|\.ts|\/)$/.test(a);
const joinDir = (a) => (b) => join(a, b);

module.exports = ({untracked, added, modified, renamed}) => {
    const gitDir = findUp.sync('.git', {
        type: 'directory',
    }).replace(/\.git$/, '');
    
    if (!gitDir)
        return [];
    
    const names = porcelaine({
        untracked,
        added,
        modified,
        renamed,
    });
    
    return names
        .filter(isJS)
        .map(joinDir(gitDir));
};

