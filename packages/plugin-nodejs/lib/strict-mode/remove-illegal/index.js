import {operator, types} from 'putout';

const {
    isArrayPattern,
    isObjectPattern,
    isAssignmentPattern,
    isRestElement,
    isFunction,
} = types;

const {remove} = operator;

export const report = () => `Avoid illegal 'use strict'`;

export const fix = (path) => {
    remove(path);
};
export const traverse = ({push}) => ({
    DirectiveLiteral({parentPath}) {
        if (!parentPath.parentPath)
            return;
        
        const fnPath = parentPath.parentPath.parentPath;
        
        if (!isFunction(fnPath))
            return;
        
        if (isIllegal(fnPath))
            push(parentPath);
    },
});

function isIllegal(fnPath) {
    const params = fnPath.get('params');
    
    for (const param of params) {
        if (isRestElement(param))
            return true;
        
        if (isAssignmentPattern(param))
            return true;
        
        if (isObjectPattern(param))
            return true;
        
        if (isArrayPattern(param))
            return true;
    }
    
    return false;
}
