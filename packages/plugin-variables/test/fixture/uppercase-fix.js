function getImportDefaultVar(name, node) {
    const DECLARATION = node.local;
    const NAME = name;
    
    return convert({
        DECLARATION,
        NAME,
    });
}
