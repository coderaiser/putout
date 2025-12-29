export const getLoadedRules = (rules) => {
    const loadedRules = [];
    
    for (const item of rules) {
        const {rule} = item;
        
        if (rule.includes('/'))
            continue;
        
        loadedRules.push(item);
    }
    
    return loadedRules;
};
