'use strict';

const {types} = require('putout');
const {
    isArrayPattern,
    isRestElement,
    isObjectPattern,
    isIdentifier,
    isVariableDeclaration,
} = types;

module.exports.createExportNamedDeclaration = ({use}) => (path) => {
    const declarationPath = path.get('declaration');
    const {declaration, specifiers} = path.node;
    
    if (declarationPath.isFunctionDeclaration())
        return use(path, declaration.id.name);
    
    if (declarationPath.isClassDeclaration())
        return use(path, declaration.id.name);
    
    // typescript
    if (declarationPath.isTSInterfaceDeclaration())
        return use(path, declaration.id.name);
    
    if (declarationPath.isTSTypeAliasDeclaration())
        return use(path, declaration.id.name);
    
    if (isVariableDeclaration(declaration)) {
        const {declarations} = declaration;
        
        for (const {id} of declarations) {
            /* istanbul ignore else */
            if (isIdentifier(id))
                use(path, id.name);
            
            if (isObjectPattern(id))
                for (const property of id.properties) {
                    if (isRestElement(property) && isIdentifier(property.argument)) {
                        use(path, property.argument.name);
                        continue;
                    }
                    
                    if (isIdentifier(property.value))
                        use(path, property.value.name);
                }
            
            if (isArrayPattern(id))
                for (const element of id.elements)
                    if (isIdentifier(element))
                        use(path, element.name);
        }
        
        return;
    }
    
    for (const {local} of specifiers) {
        /* istanbul ignore else */
        if (isIdentifier(local))
            use(path, local.name);
    }
};
