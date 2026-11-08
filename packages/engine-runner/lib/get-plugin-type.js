const TYPES = [
    ['find', 'finder'],
    ['traverse', 'traverser'],
    ['replace', 'replacer'],
    ['declare', 'declarator'],
    ['include', 'includer'],
    ['scan', 'scanner'],
];

export const getPluginType = (plugin) => {
    for (const [key, type] of TYPES) {
        if (plugin[key])
            return type;
    }
    
    return 'unknown';
};
