'use strict';

const {operator, types} = require('putout');
const {
    isArrayPattern,
    isObjectPattern,
    isAssignmentPattern,
    isRestElement,
    isFunction,
} = types;

const {remove} = operator;

module.exports.report = () => `Avoid illegal 'use strict'`;

module.exports.fix = (path) => {
    remove(path);
};
module.exports.traverse = ({push}) => ({
    DirectiveLiteral(path) {
        const fnPath = path.parentPath.parentPath.parentPath;
        
        if (!isFunction(fnPath))
            return;
        
        if (isIllegal(fnPath))
            push(path.parentPath);
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
