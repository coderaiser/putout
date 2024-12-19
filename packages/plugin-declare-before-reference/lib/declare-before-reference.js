'use strict';

const {operator} = require('putout');
const {
    remove,
    compare,
    insertBefore,
    getPathAfterRequires,
} = operator;

const {entries} = Object;

module.exports.report = ({name}) => {
    return `Declare '${name}' before referencing to avoid 'ReferenceError'`;
};

module.exports.fix = ({path}) => {
    const programPath = path.scope.getProgramParent().path;
    const {node} = path.parentPath;
    
    delete node.loc;
    
    remove(path.parentPath);
    
    const body = programPath.get('body');
    const [first] = body;
    
    if (compare(first, 'const __a = require(__b)')) {
        const latest = getPathAfterRequires(body.slice(1));
        insertBefore(latest, node);
        
        return;
    }
    
    path.__putout_declare_before_reference = true;
    programPath.node.body.unshift(node);
};

module.exports.traverse = ({push}) => ({
    Program(path) {
        const {bindings} = path.scope;
        
        for (const [name, value] of entries(bindings)) {
            const {referencePaths, path} = value;
            const {uid} = path.scope;
            
            if (path.isFunctionDeclaration())
                continue;
            
            if (path.__putout_declare_before_reference)
                break;
            
            for (const referencePath of referencePaths) {
                if (uid !== referencePath.scope.uid)
                    continue;
                
                if (referencePath.parentPath.isExportDefaultDeclaration())
                    break;
                
                if (referencePath.isExportDeclaration())
                    break;
                
                const [own, pathLoc] = getLoc(path);
                const [referenceOwn, referenceLoc] = getLoc(referencePath);
                
                const declarationLine = pathLoc.start.line;
                const referenceLine = referenceLoc.start.line;
                
                if (declarationLine > referenceLine)
                    push({
                        name,
                        path,
                    });
                
                if (!own)
                    return;
                
                if (!referenceOwn && declarationLine === referenceLine)
                    push({
                        name,
                        path,
                    });
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
