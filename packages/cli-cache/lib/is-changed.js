'use strict';

module.exports = async (fileCache, {findUp}) => {
    const result = await Promise.all([
        isNodeModulesChanged(fileCache, {
            findUp,
        }),
        isEslintChanged(fileCache, {
            findUp,
        }),
    ]);
    
    const trueCount = result.filter(Boolean).length;
    
    return Boolean(trueCount);
};

module.exports.isNodeModulesChanged = isNodeModulesChanged;
module.exports.isEslintChanged = isEslintChanged;

async function isNodeModulesChanged(fileCache, {findUp}) {
    const packagePath = await findUp('node_modules');
    
    if (!packagePath)
        return false;
    
    return isChanged(packagePath, fileCache);
}

// https://eslint.org/docs/user-guide/configuring#configuration-file-formats
async function isEslintChanged(fileCache, {findUp}) {
    const name = await findUp([
        '.eslintrc.json',
        '.eslintrc.js',
        '.eslintrc.cjs',
        '.eslintrc.yaml',
        '.eslintrc.yml',
        '.eslint.config.js',
        '.eslint.config.mjs',
        '.eslint.config.cjs',
        '.eslint.config.ts',
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
