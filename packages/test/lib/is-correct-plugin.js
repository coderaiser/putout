'use strict';

const isFn = (a) => typeof a === 'function';

module.exports = (plugin) => {
    const {
        find,
        fix,
        traverse,
        include,
        exclude,
        replace,
    } = plugin;
    
    const isFix = isFn(fix);
    const isReplace = isFn(replace);
    
    if (isReplace)
        return true;
    
    if (!isFix)
        return false;
    
    const isFind = isFn(find);
    const isTraverse = isFn(traverse);
    
    if (isFind)
        return true;
    
    if (isTraverse)
        return true;
    
    const isInclude = isFn(include);
    const isExclude = isFn(exclude);
    
    return isInclude || isExclude;
};

