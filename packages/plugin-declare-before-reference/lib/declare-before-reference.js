'use strict';

const {
    entries,
    assign,
} = Object;

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
                
                const [, pathLoc] = getLoc(path);
                const [referenceOwn, referenceLoc] = getLoc(referencePath);
                
                if (path.getAncestry().includes(referencePath))
                    assign(pathLoc, referenceLoc);
                
                const declarationLine = pathLoc.start.line;
                const referenceLine = referenceLoc.start.line;
                
                if (declarationLine > referenceLine) {
                    push({
                        name,
                        path,
                    });
                }
                
                if (!referenceOwn && declarationLine === referenceLine) {
                    push({
                        name,
                        path,
                    });
                }
            }
        }
    },
});

function getLoc(path) {
    let loc = null;
    let own = true;
    
    while (!(loc = path.node.loc)) {
        path = path.parentPath;
        own = false;
    }
    
    return [own, loc];
}
