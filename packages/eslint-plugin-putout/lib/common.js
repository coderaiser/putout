import {types} from 'putout';

const {isImportDefaultSpecifier} = types;

export const isCorrectLoc = (line, properties) => {
    for (const [i, prop] of properties.entries()) {
        if (prop.loc.start.line < i + line + 1)
            return false;
    }
    
    return true;
};

export const isCorrectImportLoc = (line, specifiers) => {
    if (!isImportDefaultSpecifier(specifiers[0]))
        ++line;
    
    for (const [i, spec] of specifiers.entries()) {
        if (spec.loc.start.line < i + line)
            return false;
    }
    
    return true;
};
