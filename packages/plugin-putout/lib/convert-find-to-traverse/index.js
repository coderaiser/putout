'use strict';

const {types, operator} = require('putout');
const {replaceWith} = operator;

const {
    ReturnStatement,
    isCallExpression,
    isIdentifier,
} = types;

module.exports.report = () => '"traverse" should be used instead of "find"';
module.exports.fix = (path) => {
    if (path.isMemberExpression())
        return path.get('property').node.name = 'traverse';
    
    if (path.isFunction())
        return path.node.params = [path.node.params[1]];
    
    if (path.isCallExpression())
        replaceWith(path, ReturnStatement(path.node.arguments[1]));
};

module.exports.traverse = ({push}) => {
    return {
        'module.exports.find = (__args) => __'(path) {
            const leftPath = path.get('left');
            const propertyPath = leftPath.get('property');
            
            const rightPath = path.get('right');
            
            if (!isTraverseLastExpression(rightPath.node.body.body))
                return;
            
            const traverseCallPath = getTraverseCall(rightPath);
            
            push(traverseCallPath);
            push(leftPath);
            
            if (rightPath.node.params.length === 2)
                push(rightPath);
        },
    };
};

function isTraverseLastExpression(body) {
    const n = body.length - 1;
    const {expression} = body[n];
    
    if (!isCallExpression(expression))
        return false;
    
    const {callee} = expression;
    
    return isIdentifier(callee, {
        name: 'traverse',
    });
}

function getTraverseCall(path) {
    let result;
    
    path.traverse({
        CallExpression(path) {
            if (!path.get('callee').isIdentifier({name: 'traverse'}))
                return;
            
            result = path;
            path.stop();
        },
    });
    
    return result;
}

