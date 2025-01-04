'use strict';

module.exports.report = () => `Remove 'test.only'`;

module.exports.replace = () => ({
    '__a.only(__b, __c)': '__a(__b, __c)',
    '__a.only(__b, __c, __d)': '__a(__b, __c, __d)',
});

module.exports.filter = (path) => {
    const objectPath = path.get('callee.object');
    
    if (!objectPath.isIdentifier())
        return false;
    
    return objectPath.node.name.startsWith('test');
};
