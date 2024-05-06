'use strict';

const {replaceWith} = require('putout').operator;

module.exports.report = (path) => {
    return `Remove useless 'Provider': '${path}' -> '${path.node.object.name}'`;
};

module.exports.fix = (path) => {
    replaceWith(path, path.node.object);
};

module.exports.traverse = ({push}) => ({
    JSXIdentifier(path) {
        if (path.node.name !== 'Provider')
            return;
        
        if (!path.parentPath.isJSXMemberExpression())
            return;
        
        if (path !== path.parentPath.get('property'))
            return;
        
        push(path.parentPath);
    },
});
