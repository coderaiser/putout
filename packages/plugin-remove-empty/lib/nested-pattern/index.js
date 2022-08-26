'use strict';

module.exports.report = () => `Avoid empty nested patterns`;

module.exports.fix = (path) => path.parentPath.remove();

module.exports.traverse = ({push}) => ({
    'ObjectPattern'(path) {
        if (path.node.properties.length)
            return;
        
        push(path);
    },
});
