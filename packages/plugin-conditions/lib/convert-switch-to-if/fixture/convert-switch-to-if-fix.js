function report(path) {
    if (path.node.type === 'ImportFinding')
        return 'remove unused import: ' + path.node.path;
    
    if (path.node.type === 'File') {
        const consts = unusedConstNames(path.node);
        
        if (consts.length > 0) {
            return 'remove unused const: ' + consts[0];
        }
    }
    
    if (path.node.type === 'BlockStmt') {
        const unused = unusedVarNames(path.node);
        
        if (unused.length > 0) {
            return 'remove unused variable: ' + unused[0];
        }
    }
    
    return 'remove unused variable';
}
