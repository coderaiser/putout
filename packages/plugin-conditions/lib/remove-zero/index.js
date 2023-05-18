'use strict';

const check = (vars, path) => {
    const {parentPath} = path;
    
    if (parentPath.isAssignmentExpression())
        return false;
    
    if (parentPath.isVariableDeclarator())
        return false;
    
    return true;
};

module.exports.report = () => 'Avoid zero in assertions';

module.exports.match = () => ({
    '__a !== 0': check,
    '__a != 0': check,
});

module.exports.replace = () => ({
    '__a !== 0': '__a',
    '__a != 0': '__a',
    '__a === 0': '!__a',
    '__a == 0': '!__a',
});
