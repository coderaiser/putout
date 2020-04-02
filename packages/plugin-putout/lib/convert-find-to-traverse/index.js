'use strict';

const {types, operator} = require('putout');
const {replaceWith} = operator;

const {
    ReturnStatement,
    isCallExpression,
    isIdentifier,
} = types;

const {entries} = Object;

module.exports.report = () => '"traverse" should be used instead of "find"';

const fixType = (types) => (path) => {
    for (const [is, fix] of entries(types)) {
        if (path[is]())
            fix(path);
    }
};

module.exports.fix = fixType({
    isMemberExpression: (path) => {
        path.get('property').node.name = 'traverse';
    },
    
    isFunction: (path) => {
        path.node.params = [path.node.params[1]];
    },
    
    isCallExpression: (path) => {
        replaceWith(path, ReturnStatement(path.node.arguments[1]));
    },
});

module.exports.traverse = ({push}) => {
    return {
        'module.exports.find = (__args) => __'(path) {
            const leftPath = path.get('left');
            const rightPath = path.get('right');
            
            if (rightPath.node.params.length !== 2)
                return;
            
            if (!isTraverseLastExpression(rightPath.node.body.body))
                return;
            
            const traverseCallPath = getTraverseCall(rightPath);
            
            push(traverseCallPath);
            push(leftPath);
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

