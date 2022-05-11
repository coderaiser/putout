'use strict';

module.exports.report = () => `Use 'Array.at()'`;

module.exports.filter = (path) => {
    const {parentPath} = path;
    
    if (!parentPath.isAssignmentExpression())
        return true;
    
    return parentPath.get('left').node !== path.node;
};

module.exports.replace = () => ({
    '__a[__a.length - __b]': '__a.at(-__b)',
});

