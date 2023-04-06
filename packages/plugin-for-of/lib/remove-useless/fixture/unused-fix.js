module.exports.isSupported = (name) => {
    {
        const isMatch = picomatch(patterns, {
            dot: true,
            matchBase: true,
        });
        
        if (isMatch(name))
            return true;
    }
    
    return false;
};
