module.exports.fix = ({path, from, to, toRename}) => {
    if (isImportSpecifier(path)) {
        path.node.imported = path.node.local;
        return;
    }
    
    if (toRename)
        rename(path, from, to);
    
    path.node.shorthand = true;
};

module.exports.traverse = ({push, options}) => ({
    ImportSpecifier(path) {
        if (path.node.imported.value === path.node.local.name)
            push({
                path,
            });
    },
});
