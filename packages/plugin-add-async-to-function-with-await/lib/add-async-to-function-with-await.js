'use strict';

const {operator} = require('putout');
const {findBinding} = operator;

module.exports.report = () => '"await" should be used in "async" function';

module.exports.fix = (path) => {
    path.node.async = true;
};

module.exports.traverse = ({push}) => ({
    AwaitExpression: (path) => {
        const fnScope = path.scope.getFunctionParent();
        
        if (!fnScope)
            return;
        
        if (!fnScope.path.node.async)
            push(fnScope.path);
    },
});

