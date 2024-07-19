import kebabCase from 'just-kebab-case';

const {keys} = Object;

export const validateArgs = async (args, optionsList) => {
    const [, ...allKeys] = keys(args);
    
    for (const arg of allKeys) {
        const kebab = kebabCase(arg);
        
        if (optionsList.includes(kebab))
            continue;
        
        const {length} = kebab;
        
        if (length === 1)
            return Error(`Invalid option '-${kebab}'`);
        
        const closest = await findClosest(kebab, optionsList);
        
        return Error(`Invalid option \`--${kebab}\`. Perhaps you meant \`--${closest}\``);
    }
    
    return null;
};

const findClosest = async (name, list) => {
    const {closest} = await import('fastest-levenshtein');
    return closest(name, list);
};
