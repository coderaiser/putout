module.exports.isSupported = (name) => {
    for (const pattern of patterns) {
        const isMatch = picomatch(patterns, {
            dot: true,
            matchBase: true,
        });
        
        if (isMatch(name))
            return true;
    }
    
    return false;
};

