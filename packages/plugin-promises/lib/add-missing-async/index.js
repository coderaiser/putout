'use strict';

module.exports.report = () => `Add missing 'async'`;

module.exports.fix = (path) => {
    path.node.async = true;
};

module.exports.traverse = ({push}) => ({
    AwaitExpression(path) {
        const fnPath = path.getFunctionParent();
        
        if (!fnPath)
            return;
        
        if (fnPath.node.async)
            return;
        
        push(fnPath);
    },
});
