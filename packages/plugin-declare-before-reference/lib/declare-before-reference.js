'use strict';

const {entries} = Object;

module.exports.report = ({name}) => {
    return `'${name}' should be declared before referencing to avoid 'ReferenceError'`;
};

module.exports.fix = ({path}) => {
    const programPath = path.scope.getProgramParent().path;
    const {body} = programPath.node;
    
    for (const [index, node] of entries(body)) {
        if (node === path.parentPath.node) {
            body.splice(index, 1);
            break;
        }
    }
    
    path.__putout_declare_before_reference = true;
    programPath.node.body.unshift(path.parentPath.node);
};

module.exports.traverse = ({push}) => ({
    Program(path) {
        const {bindings} = path.scope;
        
        for (const [name, value] of entries(bindings)) {
            const {referencePaths, path} = value;
            const {uid} = path.scope;
            
            if (path.isFunctionDeclaration())
                continue;
            
            for (const referencePath of referencePaths) {
                if (uid !== referencePath.scope.uid)
                    continue;
                
                if (path.__putout_declare_before_reference)
                    break;
                
                if (referencePath.parentPath.isExportDefaultDeclaration())
                    break;
                
                if (!path.node.loc || !referencePath.node.loc) {
                    push({
                        name,
                        path,
                    });
                    break;
                }
                
                const declarationLine = path.node.loc.start.line;
                const referenceLine = referencePath.node.loc.start.line;
                
                if (declarationLine > referenceLine) {
                    push({
                        name,
                        path,
                    });
                }
            }
        }
    },
});
