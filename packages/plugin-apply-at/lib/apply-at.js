'use strict';

const {compare} = require('putout').operator;

module.exports.report = () => `Use 'Array.at()'`;

module.exports.filter = (path) => {
    const {parentPath} = path;
    
    if (parentPath.isAssignmentExpression())
        return false;
    
    if (compare(path, '__a[length - __b]')) {
        return compare(path.parentPath.parentPath.getPrevSibling(), 'const {length} = __a');
    }
    
    return true;
};

module.exports.replace = () => ({
    '__a[__a.length - __b]': '__a.at(-__b)',
    '__a[length - __b]': '__a.at(-__b)',
});
