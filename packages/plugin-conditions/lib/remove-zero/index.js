'use strict';

const check = (vars, path) => {
    const {parentPath} = path;
    
    if (parentPath.isAssignmentExpression())
        return false;
    
    return !parentPath.isVariableDeclarator();
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
