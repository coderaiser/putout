export const getType = (name) => {
    if (name.endsWith('.json'))
        return 'json';
    
    if (/\.ya?ml$/.test(name))
        return 'yaml';
    
    if (name.endsWith('toml'))
        return 'toml';
    
    if (name.endsWith('md'))
        return 'markdown';
    
    if (/\.[cm]?ts(x)?$/.test(name))
        return 'typescript';
    
    return 'js';
};
