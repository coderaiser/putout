import {types} from 'putout';

const TYPES_EXISTS = new Set([
    'CommentBlock',
]);

const TYPES_NOT_EXISTS = new Set([
    'ExportDeclaration',
]);

export function isTypeExists(type) {
    if (TYPES_NOT_EXISTS.has(type))
        return false;
    
    if (types[`is${type}`])
        return true;
    
    return TYPES_EXISTS.has(type);
}
