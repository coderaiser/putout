'use strict';

module.exports.report = () => `Avoid empty nested patterns`;

module.exports.fix = (path) => path.parentPath.remove();

module.exports.traverse = ({push}) => ({
    'ArrayPattern'(path) {
        if (path.node.elements.length)
            return;
        
        push(path);
    },
    'ObjectPattern'(path) {
        if (path.node.properties.length)
            return;
        
        push(path);
    },
});
