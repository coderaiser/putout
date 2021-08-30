import {
    dirname,
    join,
} from 'path';
import {findUp} from 'find-up';

export async function isChanged(fileCache) {
    const result = await Promise.all([
        isNodeModulesChanged(fileCache),
        isEslintChanged(fileCache),
    ]);
    
    const trueCount = result.filter(Boolean).length;
    const is = Boolean(trueCount);
    
    return is;
}

export async function isNodeModulesChanged(fileCache) {
    const packagePath = await findUp('package.json');
    
    if (!packagePath)
        return false;
    
    const name = join(dirname(packagePath), 'node_modules');
    
    return checkCache(name, fileCache);
}

// https://eslint.org/docs/user-guide/configuring#configuration-file-formats
export // https://eslint.org/docs/user-guide/configuring#configuration-file-formats
async function isEslintChanged(fileCache) {
    const name = await findUp([
        '.eslintrc.json',
        '.eslintrc.js',
        '.eslintrc.cjs',
        '.eslintrc.yaml',
        '.eslintrc.yml',
    ]);
    
    if (!name)
        return false;
    
    return checkCache(name, fileCache);
}

function checkCache(name, fileCache) {
    const options = {};
    const places = [];
    
    const can = fileCache.canUseCache({
        name,
        options,
        fix: true,
    });
    
    fileCache.setInfo(name, places, options);
    fileCache.reconcile();
    
    return !can;
}

