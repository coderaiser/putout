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

function x() {
    {
        if (store('is-module'))
            return;
        
        if (path.node.directives.length)
            return;
        
        if (!store('is-common'))
            return;
        
        push(path);
        
        return;
    }
}
