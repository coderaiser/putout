export const checkTS = (name) => {
    if (name.endsWith('.cts'))
        return true;
    
    if (/\.tsx?$/.test(name))
        return true;
    
    return /{tsx?}$/.test(name);
};
