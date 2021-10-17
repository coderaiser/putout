'use strict';

const {dirname, join} = require('path');

module.exports = async (fileCache, {findUp}) => {
    const result = await Promise.all([
        isNodeModulesChanged(fileCache, {findUp}),
        isEslintChanged(fileCache, {findUp}),
    ]);
    
    const trueCount = result.filter(Boolean).length;
    const is = Boolean(trueCount);
    
    return is;
};

module.exports.isNodeModulesChanged = isNodeModulesChanged;
module.exports.isEslintChanged = isEslintChanged;

async function isNodeModulesChanged(fileCache, {findUp}) {
    const packagePath = await findUp('package.json');
    
    if (!packagePath)
        return false;
    
    const name = join(dirname(packagePath), 'node_modules');
    
    return isChanged(name, fileCache);
}

// https://eslint.org/docs/user-guide/configuring#configuration-file-formats
async function isEslintChanged(fileCache, {findUp}) {
    const name = await findUp([
        '.eslintrc.json',
        '.eslintrc.js',
        '.eslintrc.cjs',
        '.eslintrc.yaml',
        '.eslintrc.yml',
    ]);
    
    if (!name)
        return false;
    
    return isChanged(name, fileCache);
}

function isChanged(name, fileCache) {
    const options = {};
    const places = [];
    
    const can = fileCache.canUseCache(name, options);
    
    fileCache.setInfo(name, places, options);
    fileCache.reconcile();
    
    return !can;
}

