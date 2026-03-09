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

function x() {
    for (const node of path.node.body) {
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
