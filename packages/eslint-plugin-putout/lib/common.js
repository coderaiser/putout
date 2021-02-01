'use strict';

const {isImportDefaultSpecifier} = require('putout').types;

module.exports.isCorrectLoc = (line, properties) => {
    const n = properties.length;
    
    for (let i = 0; i < n; i++) {
        const prop = properties[i];
        
        if (prop.loc.start.line < i + line + 1)
            return false;
    }
    
    return true;
};

module.exports.isCorrectImportLoc = (line, specifiers) => {
    const n = specifiers.length;
    
    if (!isImportDefaultSpecifier(specifiers[0]))
        ++line;
    
    for (let i = 0; i < n; i++) {
        const spec = specifiers[i];
        
        if (spec.loc.start.line < i + line)
            return false;
    }
    
    return true;
};

