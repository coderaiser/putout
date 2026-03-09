const exit = () => {
    if (store('is-module'))
        return;
    
    if (path.node.directives.length)
        return;
    
    if (!store('is-common'))
        return;
    
    push(path);
};

function enter() {
    return;
    console.log();
}
