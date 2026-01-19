const isFn = (a) => typeof a === 'function';

export const getIsCorrectPluginMessage = () => `should export 'replace', 'find', 'traverse', 'include', 'exclude', 'declare' or 'scan' function`;

export const isCorrectPlugin = (plugin) => {
    const {
        find,
        fix,
        traverse,
        include,
        exclude,
        replace,
        declare,
        scan,
    } = plugin;
    
    const isFix = isFn(fix);
    const isReplace = isFn(replace);
    
    if (isReplace)
        return true;
    
    if (isFn(declare))
        return true;
    
    if (!isFix)
        return false;
    
    if (isFn(scan))
        return true;
    
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
