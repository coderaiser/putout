'use strict';

module.exports.getExportDefault = (path) => {
    const programParent = path.scope.getProgramParent();
    const programPath = programParent.path;
    
    for (const current of programPath.get('body')) {
        if (current.isExportDefaultDeclaration())
            return current;
    }
    
    return null;
};
