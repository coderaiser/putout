const {entries} = Object;

export const matchToFlat = (config) => {
    const result = [];
    
    for (const [name, rules] of entries(config)) {
        result.push({
            files: [name],
            rules,
        });
    }
    
    return result;
};
