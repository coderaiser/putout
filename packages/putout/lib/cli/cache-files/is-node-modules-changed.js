'use strict';

const {dirname, join} = require('path');
const findUp = require('find-up');

module.exports = async (fileCache) => {
    const packagePath = await findUp('package.json');
    
    if (!packagePath)
        return false;
    
    const name = join(dirname(packagePath), 'node_modules');
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
};

