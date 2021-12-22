'use strict';

const {isImportDefaultSpecifier} = require('putout').types;

module.exports.isCorrectLoc = (line, properties) => {
    for (const [i, prop] of properties.entries()) {
        if (prop.loc.start.line < i + line + 1)
            return false;
    }
    
    return true;
};

module.exports.isCorrectImportLoc = (line, specifiers) => {
    if (!isImportDefaultSpecifier(specifiers[0]))
        ++line;
    
    for (const [i, spec] of specifiers.entries()) {
        if (spec.loc.start.line < i + line)
            return false;
    }
    
    return true;
};

