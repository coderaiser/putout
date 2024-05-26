'use strict';

module.exports.getPathAfterRequires = (body) => {
    let path;
    
    for (path of body) {
        if (!isRequire(path))
            break;
    }
    
    return path;
};

function isRequire(path) {
    if (!path.isVariableDeclaration())
        return false;
    
    const initPath = path.get('declarations.0.init');
    
    if (!initPath.isCallExpression())
        return false;
    
    const calleePath = initPath.get('callee');
    
    return calleePath.isIdentifier({
        name: 'require',
    });
}
